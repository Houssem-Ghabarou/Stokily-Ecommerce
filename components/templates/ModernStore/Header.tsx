"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, Store } from "lucide-react";
import { useState } from "react";
import { WebsiteConfig, Category } from "@/lib/api";
import SearchBar from "./SearchBar";

interface HeaderProps {
  config: WebsiteConfig;
  categories: Category[];
  cartItemCount: number;
  slug: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({
  config,
  categories,
  cartItemCount,
  slug,
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Calculate header height based on logo size
  const logoSize = config.logoSize || 40;
  const headerHeight = Math.max(64, logoSize + 24); // Minimum 64px, or logo size + 24px padding

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center justify-between gap-4"
          style={{ minHeight: `${headerHeight}px`, height: `${headerHeight}px` }}
        >
          {/* Logo & Store Name */}
          <Link
            href={`/${slug}`}
            className="flex items-center gap-3 flex-shrink-0"
          >
            {config.logoUrl ? (
              <div 
                className="relative rounded-xl overflow-hidden shadow-sm bg-white"
                style={{ 
                  width: `${config.logoSize || 40}px`, 
                  height: `${config.logoSize || 40}px` 
                }}
              >
                <Image
                  src={config.logoUrl}
                  alt={config.storeName}
                  fill
                  className="object-contain"
                  sizes={`${config.logoSize || 40}px`}
                />
              </div>
            ) : (
              <div
                className="rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ 
                  backgroundColor: config.primaryColor,
                  width: `${config.logoSize || 40}px`, 
                  height: `${config.logoSize || 40}px` 
                }}
              >
                <Store 
                  style={{ 
                    width: `${(config.logoSize || 40) * 0.5}px`, 
                    height: `${(config.logoSize || 40) * 0.5}px` 
                  }}
                />
              </div>
            )}
            <span
              className="font-bold hidden sm:block"
              style={{ 
                fontFamily: "var(--font-heading), system-ui, sans-serif",
                color: config.secondaryColor,
                fontSize: `${config.headerTextSize || 20}px`
              }}
            >
              {config.storeName}
            </span>
          </Link>

          {/* Desktop Search Bar */}
          {onSearchChange && (
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search products..."
              />
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href={`/${slug}`}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Home
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            {onSearchChange && (
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            )}

            {/* Cart */}
            <Link
              href={`/${slug}/cart`}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full text-white text-xs flex items-center justify-center px-1 font-medium"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && onSearchChange && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products..."
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <Link
                href={`/${slug}`}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
