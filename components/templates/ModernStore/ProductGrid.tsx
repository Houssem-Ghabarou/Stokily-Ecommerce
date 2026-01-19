"use client";

import { WebsiteProduct, Category } from "@/lib/api";
import { Package } from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: WebsiteProduct[];
  categories: Category[];
  slug: string;
  primaryColor: string;
  currency?: string;
  selectedCategory?: string | null;
  onCategoryChange?: (categoryId: string | null) => void;
  onAddToCart?: (product: WebsiteProduct) => void;
  showCategoryFilter?: boolean;
}

export default function ProductGrid({
  products,
  categories,
  slug,
  primaryColor,
  currency = "TND",
  selectedCategory,
  onCategoryChange,
  onAddToCart,
  showCategoryFilter = true,
}: ProductGridProps) {
  // If showCategoryFilter is false, products are already filtered externally
  const displayProducts = showCategoryFilter && selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  return (
    <div>
      {/* Category Filter - only show if enabled */}
      {showCategoryFilter && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange?.(null)}
            className={`filter-pill ${
              !selectedCategory ? "filter-pill-active" : "filter-pill-inactive"
            }`}
            style={
              !selectedCategory ? { backgroundColor: primaryColor } : undefined
            }
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange?.(category.id)}
              className={`filter-pill ${
                selectedCategory === category.id
                  ? "filter-pill-active"
                  : "filter-pill-inactive"
              }`}
              style={
                selectedCategory === category.id
                  ? { backgroundColor: primaryColor }
                  : undefined
              }
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              slug={slug}
              primaryColor={primaryColor}
              currency={currency}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Package className="empty-state-icon" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4 max-w-sm">
            We couldn&apos;t find any products matching your criteria. Try
            adjusting your filters or search terms.
          </p>
          {(selectedCategory || showCategoryFilter) && onCategoryChange && (
            <button
              onClick={() => onCategoryChange(null)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              View all products
            </button>
          )}
        </div>
      )}
    </div>
  );
}
