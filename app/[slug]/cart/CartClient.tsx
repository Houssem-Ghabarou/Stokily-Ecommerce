"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Header, Footer } from "@/components/templates/ModernStore";
import { WebsiteConfig, Category } from "@/lib/api";
import { CartState } from "@/types";
import { loadCart, updateCartItemQuantity, removeFromCart } from "@/lib/cart";

interface CartClientProps {
  config: WebsiteConfig;
  categories: Category[];
  slug: string;
}

export default function CartClient({ config, categories, slug }: CartClientProps) {
  const [cart, setCart] = useState<CartState>({ items: [], subtotal: 0, itemCount: 0 });

  useEffect(() => {
    setCart(loadCart(config.companyId));
  }, [config.companyId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TND",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleQuantityChange = (
    productId: string,
    variantId: string | undefined,
    delta: number
  ) => {
    const item = cart.items.find(
      (i) => i.productId === productId && i.variantId === variantId
    );
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    const newCart = updateCartItemQuantity(
      config.companyId,
      cart,
      productId,
      variantId,
      newQuantity
    );
    setCart(newCart);
  };

  const handleRemoveItem = (productId: string, variantId: string | undefined) => {
    const newCart = removeFromCart(config.companyId, cart, productId, variantId);
    setCart(newCart);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header
          config={config}
          categories={categories}
          cartItemCount={0}
          slug={slug}
        />

        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1
              className="text-2xl font-bold mb-4"
              style={{ 
                fontFamily: `var(--font-heading), ${config.headingFont || 'Poppins'}, system-ui, sans-serif`,
                color: config.secondaryColor 
              }}
            >
              Your cart is empty
            </h1>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added any items yet.
            </p>
            <Link
              href={`/${slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: config.primaryColor }}
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer config={config} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        config={config}
        categories={categories}
        cartItemCount={cart.itemCount}
        slug={slug}
      />

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1
            className="text-3xl font-bold mb-8"
            style={{ color: config.secondaryColor }}
          >
            Shopping Cart ({cart.itemCount} {cart.itemCount === 1 ? "item" : "items"})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || "default"}`}
                  className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.productName}
                    </h3>
                    {item.variantName && (
                      <p className="text-sm text-gray-500">{item.variantName}</p>
                    )}
                    <p
                      className="font-bold mt-1"
                      style={{ color: config.primaryColor }}
                    >
                      {formatPrice(item.unitPrice)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, item.variantId, -1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.productId, item.variantId, 1)
                          }
                          disabled={item.quantity >= item.maxQuantity}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId, item.variantId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={Number(config.shippingPrice) > 0 ? "" : "text-green-600"}>
                      {Number(config.shippingPrice) > 0
                        ? formatPrice(Number(config.shippingPrice))
                        : "Free"}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span style={{ color: config.primaryColor }}>
                      {formatPrice(cart.subtotal + (Number(config.shippingPrice) || 0))}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/${slug}/checkout`}
                  className="w-full py-4 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-opacity hover:opacity-90"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Proceed to Checkout
                </Link>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Cash on delivery only
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}
