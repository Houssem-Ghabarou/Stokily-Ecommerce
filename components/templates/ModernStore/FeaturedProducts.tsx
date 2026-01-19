"use client";

import { WebsiteProduct } from "@/lib/api";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ProductBadges from "./ProductBadge";

interface FeaturedProductsProps {
  products: WebsiteProduct[];
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  currency?: string;
  onAddToCart?: (product: WebsiteProduct) => void;
}

export default function FeaturedProducts({
  products,
  slug,
  primaryColor,
  secondaryColor,
  currency = "TND",
  onAddToCart,
}: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (products.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price);
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 320; // Approximate card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    product: WebsiteProduct
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.hasVariants) {
      window.location.href = `/${slug}/products/${product.id}`;
      return;
    }
    onAddToCart?.(product);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${primaryColor}15` }}
            >
              <Star
                className="w-6 h-6"
                style={{ color: primaryColor }}
                fill={primaryColor}
              />
            </div>
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                  color: secondaryColor 
                }}
              >
                Featured Products
              </h2>
              <p className="text-gray-500 text-sm">
                Handpicked favorites just for you
              </p>
            </div>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Product Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="featured-scroll -mx-4 px-4"
        >
          {products.map((product) => {
            const hasDiscount = product.isOnSale && product.originalPrice;
            const images =
              product.imageUrls && product.imageUrls.length > 0
                ? product.imageUrls
                : product.imageUrl
                ? [product.imageUrl]
                : [];

            return (
              <Link
                key={product.id}
                href={`/${slug}/products/${product.id}`}
                className="featured-card group w-[280px] sm:w-[300px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                  {images.length > 0 ? (
                    <Image
                      src={images[0]}
                      alt={product.name}
                      fill
                      className="object-cover img-zoom"
                      sizes="300px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg
                        className="w-12 h-12"
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

                  {/* Badges */}
                  <ProductBadges
                    product={product}
                    className="absolute top-3 left-3"
                  />

                  {/* Featured Tag */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Star className="w-3 h-3" fill="white" />
                      Featured
                    </span>
                  </div>

                  {/* Out of Stock */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {product.categoryName && (
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {product.categoryName}
                    </p>
                  )}

                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xl font-bold ${
                          hasDiscount ? "text-red-600" : ""
                        }`}
                        style={!hasDiscount ? { color: primaryColor } : undefined}
                      >
                        {formatPrice(product.sellingPrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      )}
                    </div>

                    {product.inStock && (
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {product.hasVariants ? "Options" : "Add"}
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
