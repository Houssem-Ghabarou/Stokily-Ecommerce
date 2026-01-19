"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Header,
  Footer,
  Hero,
  ProductGrid,
  FeaturedProducts,
  FilterBar,
} from "@/components/templates/ModernStore";
import { SortOption } from "@/components/templates/ModernStore/FilterBar";
import { WebsiteConfig, WebsiteProduct, Category } from "@/lib/api";
import { CartItem, CartState } from "@/types";
import { loadCart, addToCart } from "@/lib/cart";
import Toast from "@/components/ui/Toast";

interface StoreClientProps {
  config: WebsiteConfig;
  products: WebsiteProduct[];
  categories: Category[];
  slug: string;
}

export default function StoreClient({
  config,
  products,
  categories,
  slug,
}: StoreClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cart, setCart] = useState<CartState>({
    items: [],
    subtotal: 0,
    itemCount: 0,
  });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const categoryParam = searchParams.get("category");

  // Load cart on mount
  useEffect(() => {
    setCart(loadCart(config.companyId));
  }, [config.companyId]);

  // Get featured products - only show products explicitly marked as featured
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.isFeatured === true);
  }, [products]);

  // Filter and sort products (include all products, even featured ones)
  const filteredProducts = useMemo(() => {
    // Include all products, including featured ones (they appear in both sections)
    let result = [...products];

    // Filter by category
    if (categoryParam) {
      result = result.filter((p) => p.categoryId === categoryParam);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.categoryName?.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case "newest":
        result.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          return 0;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "default":
      default:
        // Sort by name for default
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, categoryParam, searchQuery, sortOption]);

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    router.push(`/${slug}?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  const handleAddToCart = useCallback(
    (product: WebsiteProduct) => {
      if (!product.inStock) return;

      const cartItem: Omit<CartItem, "quantity"> = {
        productId: product.id,
        productName: product.name,
        unitPrice: product.sellingPrice,
        imageUrl: product.imageUrl,
        maxQuantity: product.totalStock,
      };

      const newCart = addToCart(config.companyId, cart, cartItem);
      setCart(newCart);
      setToast({ message: `${product.name} added to cart`, type: "success" });
    },
    [cart, config.companyId]
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        config={config}
        categories={categories}
        cartItemCount={cart.itemCount}
        slug={slug}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="flex-1">
        <Hero config={config} />

        {/* Featured Products Section - always visible when available, regardless of filters */}
        {featuredProducts.length > 0 && (
          <FeaturedProducts
            products={featuredProducts}
            slug={slug}
            primaryColor={config.primaryColor}
            secondaryColor={config.secondaryColor}
            onAddToCart={handleAddToCart}
          />
        )}

        <section id="products" className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ 
                color: config.secondaryColor,
                fontFamily: `var(--font-heading), ${config.headingFont || 'Poppins'}, system-ui, sans-serif`
              }}
            >
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : categoryParam
                ? categories.find((c) => c.id === categoryParam)?.name ||
                  "Products"
                : "All Products"}
            </h2>
            </div>

            <FilterBar
              categories={categories}
              selectedCategory={categoryParam}
              onCategoryChange={handleCategoryChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
              productCount={filteredProducts.length}
              primaryColor={config.primaryColor}
            />

            <ProductGrid
              products={filteredProducts}
              categories={categories}
              slug={slug}
              primaryColor={config.primaryColor}
              selectedCategory={categoryParam}
              onCategoryChange={handleCategoryChange}
              onAddToCart={handleAddToCart}
              showCategoryFilter={false}
            />
          </div>
        </section>
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
