// Re-export all types from lib/api for convenience
export type {
  WebsiteConfig,
  ProductVariant,
  WebsiteProduct,
  Category,
  PublicWebsiteData,
  OrderItem,
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/lib/api";

// Cart types
export interface CartItem {
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
  maxQuantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}
