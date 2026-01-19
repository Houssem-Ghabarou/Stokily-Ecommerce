"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Header, Footer } from "@/components/templates/ModernStore";
import { WebsiteConfig, Category, createOrder } from "@/lib/api";
import { CartState } from "@/types";
import { loadCart, clearCart } from "@/lib/cart";

interface CheckoutClientProps {
  config: WebsiteConfig;
  categories: Category[];
  slug: string;
}

interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  street: string;
  city: string;
  postalCode: string;
  customerNotes: string;
}

export default function CheckoutClient({ config, categories, slug }: CheckoutClientProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartState>({ items: [], subtotal: 0, itemCount: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; orderNumber: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Debug logging
  useEffect(() => {
    console.log("[Checkout] Config received:", config);
    console.log("[Checkout] Shipping price from config:", config.shippingPrice);
    console.log("[Checkout] Shipping price type:", typeof config.shippingPrice);
    console.log("[Checkout] Shipping price > 0?", config.shippingPrice && config.shippingPrice > 0);
  }, [config]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  useEffect(() => {
    const loadedCart = loadCart(config.companyId);
    if (loadedCart.items.length === 0 && !orderSuccess) {
      router.push(`/${slug}/cart`);
    }
    setCart(loadedCart);
  }, [config.companyId, slug, router, orderSuccess]);

  // Debug logging for shipping price
  useEffect(() => {
    console.log("[Checkout] Full config object:", JSON.stringify(config, null, 2));
    console.log("[Checkout] Shipping price value:", config.shippingPrice);
    console.log("[Checkout] Shipping price type:", typeof config.shippingPrice);
    console.log("[Checkout] Shipping price > 0 check:", (config.shippingPrice ?? 0) > 0);
    console.log("[Checkout] Has shippingPrice key:", 'shippingPrice' in config);
  }, [config]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TND",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createOrder(config.companyId, {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone || undefined,
        shippingAddress: data.street
          ? {
              street: data.street,
              city: data.city,
              postalCode: data.postalCode || undefined,
            }
          : undefined,
        items: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        customerNotes: data.customerNotes || undefined,
      });

      setOrderSuccess(result);
      clearCart(config.companyId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Order Success Screen
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header
          config={config}
          categories={categories}
          cartItemCount={0}
          slug={slug}
        />

        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${config.primaryColor}20` }}
            >
              <CheckCircle
                className="w-12 h-12"
                style={{ color: config.primaryColor }}
              />
            </div>

            <h1
              className="text-3xl font-bold mb-4"
              style={{ 
                fontFamily: `var(--font-heading), ${config.headingFont || 'Poppins'}, system-ui, sans-serif`,
                color: config.secondaryColor 
              }}
            >
              Order In Progress
            </h1>

            <p className="text-gray-600 mb-2">
              Thank you for your order. Your order number is:
            </p>

            <p
              className="text-2xl font-bold mb-6"
              style={{ color: config.primaryColor }}
            >
              {orderSuccess.orderNumber}
            </p>

            <p className="text-gray-500 text-sm mb-8">
              We&apos;ll contact you shortly to confirm your order.
              Payment will be collected upon delivery.
            </p>

            <Link
              href={`/${slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: config.primaryColor }}
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer config={config} />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return null; // Will redirect
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
            href={`/${slug}/cart`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1
            className="text-3xl font-bold mb-8"
            style={{ color: config.secondaryColor }}
          >
            Checkout
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">Contact Information</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register("customerName", {
                          required: "Name is required",
                        })}
                        className="input"
                        placeholder="Your full name"
                      />
                      {errors.customerName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.customerName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("customerEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className="input"
                        placeholder="your@email.com"
                      />
                      {errors.customerEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.customerEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("customerPhone")}
                        className="input"
                        placeholder="+216 XX XXX XXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">Shipping Address</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        {...register("street")}
                        className="input"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          {...register("city")}
                          className="input"
                          placeholder="Tunis"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          {...register("postalCode")}
                          className="input"
                          placeholder="1000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4">Order Notes</h2>

                  <textarea
                    {...register("customerNotes")}
                    rows={3}
                    className="input"
                    placeholder="Any special instructions for your order..."
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {cart.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.variantId || "default"}`}
                        className="flex gap-3"
                      >
                        <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.productName}
                          </p>
                          {item.variantName && (
                            <p className="text-xs text-gray-500">{item.variantName}</p>
                          )}
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className={(() => {
                        const shipping = Number(config.shippingPrice) || 0;
                        console.log("[Checkout Render] Shipping value:", shipping, "type:", typeof shipping);
                        return shipping > 0 ? "" : "text-green-600";
                      })()}>
                        {(() => {
                          const shipping = Number(config.shippingPrice) || 0;
                          console.log("[Checkout Render] Displaying shipping:", shipping);
                          return shipping > 0 ? formatPrice(shipping) : "Free";
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span style={{ color: config.primaryColor }}>
                        {formatPrice(cart.subtotal + (Number(config.shippingPrice) || 0))}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    Cash on delivery - Pay when you receive
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}
