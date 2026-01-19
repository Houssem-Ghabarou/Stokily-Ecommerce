"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Header, Footer } from "@/components/templates/ModernStore";
import { WebsiteConfig, WebsiteProduct, Category, ProductVariant } from "@/lib/api";
import { CartState } from "@/types";
import { loadCart, addToCart } from "@/lib/cart";
import Toast from "@/components/ui/Toast";

interface ProductDetailClientProps {
  config: WebsiteConfig;
  product: WebsiteProduct;
  categories: Category[];
  slug: string;
}

export default function ProductDetailClient({
  config,
  product,
  categories,
  slug,
}: ProductDetailClientProps) {
  const [cart, setCart] = useState<CartState>({ items: [], subtotal: 0, itemCount: 0 });
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Load cart on mount
  useEffect(() => {
    setCart(loadCart(config.companyId));
  }, [config.companyId]);

  // Set default variant if product has variants
  useEffect(() => {
    if (product.hasVariants && product.variants && product.variants.length > 0) {
      // Select first variant with stock
      const inStockVariant = product.variants.find((v) => v.quantity > 0);
      const defaultVariant = inStockVariant || product.variants[0];
      setSelectedVariant(defaultVariant);
      // Initialize selected attributes from default variant
      if (defaultVariant.attributes) {
        setSelectedAttributes(defaultVariant.attributes);
      }
    }
  }, [product]);

  // Find variant matching all selected attributes
  const findMatchingVariant = useCallback((attributes: Record<string, string>): ProductVariant | null => {
    if (!product.variants || product.variants.length === 0) return null;

    // Find exact match first
    const exactMatch = product.variants.find((v) => {
      const variantAttrs = v.attributes || {};
      return Object.keys(attributes).every(
        (key) => variantAttrs[key] === attributes[key]
      ) && Object.keys(variantAttrs).length === Object.keys(attributes).length;
    });

    if (exactMatch) return exactMatch;

    // Find partial match (variant that has all selected attributes, even if it has more)
    const partialMatch = product.variants.find((v) => {
      const variantAttrs = v.attributes || {};
      return Object.keys(attributes).every(
        (key) => variantAttrs[key] === attributes[key]
      );
    });

    return partialMatch || null;
  }, [product.variants]);

  // Update variant when selected attributes change
  useEffect(() => {
    if (product.hasVariants && product.variants && Object.keys(selectedAttributes).length > 0) {
      const matchingVariant = findMatchingVariant(selectedAttributes);
      if (matchingVariant && matchingVariant.id !== selectedVariant?.id) {
        setSelectedVariant(matchingVariant);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttributes]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TND",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const currentPrice = selectedVariant?.sellingPrice || product.sellingPrice;
  const currentStock = selectedVariant ? selectedVariant.quantity : product.totalStock;
  
  // Get images - prefer imageUrls array, fallback to imageUrl
  const productImages = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : product.imageUrl
    ? [product.imageUrl]
    : [];
  
    console.log(productImages,'productImages');
  // If variant has an image, prioritize it but still show product images
  const variantImage = selectedVariant?.imageUrl;
  const currentImages = variantImage && !productImages.includes(variantImage)
    ? [variantImage, ...productImages]
    : productImages;
  const currentImage = currentImages[selectedImageIndex] || currentImages[0];
  const isInStock = currentStock > 0;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isInStock) return;

    const newCart = addToCart(config.companyId, cart, {
      productId: product.id,
      productName: product.name,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      unitPrice: currentPrice,
      imageUrl: currentImage,
      maxQuantity: currentStock,
      quantity,
    });

    setCart(newCart);
    setToast({
      message: `${product.name}${selectedVariant ? ` (${selectedVariant.name})` : ""} added to cart`,
      type: "success",
    });
    setQuantity(1);
  };

  // Get unique attribute names for variant selection
  const variantAttributes = product.hasVariants && product.variants
    ? Array.from(
        new Set(
          product.variants.flatMap((v) => Object.keys(v.attributes || {}))
        )
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        config={config}
        categories={categories}
        cartItemCount={cart.itemCount}
        slug={slug}
      />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-32 h-32"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {!isInStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Image Navigation Arrows (if multiple images) */}
                {currentImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIndex(
                          (prev) => (prev - 1 + currentImages.length) % currentImages.length
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIndex(
                          (prev) => (prev + 1) % currentImages.length
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {currentImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {currentImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.categoryName && (
                <p className="text-sm text-gray-500 mb-2">{product.categoryName}</p>
              )}

              <h1
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ color: config.secondaryColor }}
              >
                {product.name}
              </h1>

              <p
                className="text-3xl font-bold mb-6"
                style={{ color: config.primaryColor }}
              >
                {formatPrice(currentPrice)}
              </p>

              {product.description && (
                <p className="text-gray-600 mb-6">{product.description}</p>
              )}

              {/* Variant Selection */}
              {product.hasVariants && product.variants && product.variants.length > 0 && (
                <div className="mb-6 space-y-4">
                  {variantAttributes.map((attrName) => {
                    const values = Array.from(
                      new Set(
                        product.variants!
                          .map((v) => v.attributes?.[attrName])
                          .filter(Boolean)
                      )
                    );

                    return (
                      <div key={attrName}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {attrName}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {values.map((value) => {
                            const isSelected = selectedAttributes[attrName] === value;
                            
                            // Check if this value is available with current other selections
                            const testAttributes = {
                              ...selectedAttributes,
                              [attrName]: value,
                            };
                            const matchingVariant = findMatchingVariant(testAttributes);
                            const isAvailable = matchingVariant && matchingVariant.quantity > 0;

                            // Also check if any variant with this value exists (for visual feedback)
                            const hasAnyVariantWithValue = product.variants!.some(
                              (v) => v.attributes?.[attrName] === value && v.quantity > 0
                            );

                            return (
                              <button
                                key={value}
                                onClick={() => {
                                  setSelectedAttributes((prev) => ({
                                    ...prev,
                                    [attrName]: value,
                                  }));
                                  setQuantity(1);
                                }}
                                disabled={!hasAnyVariantWithValue}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                                  isSelected
                                    ? "text-white"
                                    : isAvailable
                                    ? "border-gray-300 text-gray-700 hover:border-gray-400"
                                    : hasAnyVariantWithValue
                                    ? "border-gray-300 text-gray-700 hover:border-gray-400 opacity-50"
                                    : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                                }`}
                                style={
                                  isSelected
                                    ? {
                                        backgroundColor: config.primaryColor,
                                        borderColor: config.primaryColor,
                                      }
                                    : undefined
                                }
                                title={
                                  !isAvailable && hasAnyVariantWithValue
                                    ? "This combination is not available"
                                    : undefined
                                }
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {selectedVariant && (
                    <p className="text-sm text-gray-500">
                      Selected: {selectedVariant.name} ({currentStock} in stock)
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              {isInStock && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= currentStock}
                        className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {currentStock} available
                    </span>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-3 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: config.primaryColor }}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Stock Status */}
              {isInStock && currentStock <= 5 && (
                <p className="mt-4 text-orange-600 text-sm font-medium">
                  Only {currentStock} left in stock!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer config={config} />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
