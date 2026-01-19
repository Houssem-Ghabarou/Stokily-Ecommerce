"use client";

import { Category } from "@/lib/api";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "name-asc";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
  primaryColor: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  productCount,
  primaryColor,
}: FilterBarProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeFilters = selectedCategory ? 1 : 0;

  const clearAllFilters = () => {
    onCategoryChange(null);
    onSortChange("default");
  };

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="hidden md:flex items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onCategoryChange(null)}
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
              onClick={() => onCategoryChange(category.id)}
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

        {/* Sort & Count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {productCount} {productCount === 1 ? "product" : "products"}
          </span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="sort-select appearance-none pr-8"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="md:hidden mb-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters > 0 && (
              <span
                className="w-5 h-5 rounded-full text-xs text-white flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                {activeFilters}
              </span>
            )}
          </button>

          <div className="relative flex-1 max-w-[160px]">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full sort-select appearance-none pr-8 text-sm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <span className="text-sm text-gray-500 whitespace-nowrap">
            {productCount} items
          </span>
        </div>

        {/* Active Filter Tags */}
        {selectedCategory && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">Active:</span>
            <button
              onClick={() => onCategoryChange(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {categories.find((c) => c.id === selectedCategory)?.name}
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <>
          <div
            className="filter-drawer-overlay"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="filter-drawer max-h-[70vh]">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onCategoryChange(null);
                      setShowMobileFilters(false);
                    }}
                    className={`filter-pill ${
                      !selectedCategory
                        ? "filter-pill-active"
                        : "filter-pill-inactive"
                    }`}
                    style={
                      !selectedCategory
                        ? { backgroundColor: primaryColor }
                        : undefined
                    }
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.id);
                        setShowMobileFilters(false);
                      }}
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
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
