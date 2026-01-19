"use client";

import { CartItem, CartState } from "@/types";

const CART_STORAGE_KEY = "stokily_cart";

export function getStorageKey(companyId: string): string {
  return `${CART_STORAGE_KEY}_${companyId}`;
}

export function loadCart(companyId: string): CartState {
  if (typeof window === "undefined") {
    return { items: [], subtotal: 0, itemCount: 0 };
  }

  try {
    const stored = localStorage.getItem(getStorageKey(companyId));
    if (stored) {
      const cart = JSON.parse(stored) as CartState;
      return cart;
    }
  } catch (error) {
    console.error("Error loading cart:", error);
  }

  return { items: [], subtotal: 0, itemCount: 0 };
}

export function saveCart(companyId: string, cart: CartState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(getStorageKey(companyId), JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
}

export function clearCart(companyId: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(getStorageKey(companyId));
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}

function calculateCartTotals(items: CartItem[]): { subtotal: number; itemCount: number } {
  return items.reduce(
    (acc, item) => ({
      subtotal: acc.subtotal + item.unitPrice * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { subtotal: 0, itemCount: 0 }
  );
}

export function addToCart(
  companyId: string,
  cart: CartState,
  item: Omit<CartItem, "quantity"> & { quantity?: number }
): CartState {
  const quantity = item.quantity || 1;
  const existingIndex = cart.items.findIndex(
    (i) => i.productId === item.productId && i.variantId === item.variantId
  );

  let newItems: CartItem[];

  if (existingIndex >= 0) {
    // Update existing item
    newItems = cart.items.map((i, index) => {
      if (index === existingIndex) {
        const newQuantity = Math.min(i.quantity + quantity, i.maxQuantity);
        return { ...i, quantity: newQuantity };
      }
      return i;
    });
  } else {
    // Add new item
    newItems = [
      ...cart.items,
      {
        ...item,
        quantity: Math.min(quantity, item.maxQuantity),
      },
    ];
  }

  const totals = calculateCartTotals(newItems);
  const newCart = { items: newItems, ...totals };
  saveCart(companyId, newCart);
  return newCart;
}

export function updateCartItemQuantity(
  companyId: string,
  cart: CartState,
  productId: string,
  variantId: string | undefined,
  quantity: number
): CartState {
  const newItems = cart.items
    .map((item) => {
      if (item.productId === productId && item.variantId === variantId) {
        if (quantity <= 0) return null;
        return { ...item, quantity: Math.min(quantity, item.maxQuantity) };
      }
      return item;
    })
    .filter(Boolean) as CartItem[];

  const totals = calculateCartTotals(newItems);
  const newCart = { items: newItems, ...totals };
  saveCart(companyId, newCart);
  return newCart;
}

export function removeFromCart(
  companyId: string,
  cart: CartState,
  productId: string,
  variantId: string | undefined
): CartState {
  const newItems = cart.items.filter(
    (item) => !(item.productId === productId && item.variantId === variantId)
  );

  const totals = calculateCartTotals(newItems);
  const newCart = { items: newItems, ...totals };
  saveCart(companyId, newCart);
  return newCart;
}
