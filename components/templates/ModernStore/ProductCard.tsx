"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { WebsiteProduct } from "@/lib/api";
import ProductBadges from "./ProductBadge";

interface ProductCardProps {
  product: WebsiteProduct;
  slug: string;
  primaryColor: string;
  currency?: string;
  onAddToCart?: (product: WebsiteProduct) => void;
}

export default function ProductCard({
  product,
  slug,
  primaryColor,
  currency = "TND",
  onAddToCart,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If product has variants, navigate to product page
    if (product.hasVariants) {
      window.location.href = `/${slug}/products/${product.id}`;
      return;
    }

    onAddToCart?.(product);
  };

  const hasDiscount = product.isOnSale && product.originalPrice;

  return (
    <Link
      href={`/${slug}/products/${product.id}`}
      className="group card card-hover overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {(() => {
          const images =
            product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls
              : product.imageUrl
              ? [product.imageUrl]
              : [];

          if (images.length > 0) {
            return (
              <>
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover img-zoom"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                    +{images.length - 1}
                  </div>
                )}
              </>
            );
          }

          return (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg
                className="w-16 h-16"
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
          );
        })()}

        {/* Product Badges (New, Sale, Low Stock) */}
        <ProductBadges product={product} className="absolute top-2 left-2" />

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}

        {/* Variants Badge - bottom right if in stock */}
        {product.inStock &&
          product.hasVariants &&
          product.variants &&
          product.variants.length > 0 && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-gray-900/80 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                {product.variants.length} options
              </span>
            </div>
          )}

        {/* Quick Add Button - appears on hover */}
        {product.inStock && !product.hasVariants && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 p-2.5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            style={{ color: primaryColor }}
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 
          className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]"
          style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
        >
          {product.name}
        </h3>

        {product.categoryName && (
          <p className="text-sm text-gray-500 mt-1 truncate">
            {product.categoryName}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <span
            className={`text-lg font-bold ${hasDiscount ? "price-sale" : ""}`}
            style={!hasDiscount ? { color: primaryColor } : undefined}
          >
            {formatPrice(product.sellingPrice)}
          </span>

          {hasDiscount && (
            <span className="price-original">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
