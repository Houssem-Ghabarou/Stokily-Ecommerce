const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://stokily-backend.vercel.app/api";

export interface WebsiteConfig {
  id: string;
  companyId: string;
  status: "draft" | "published" | "unpublished";
  templateId: string;
  templateVersion: string;
  storeName: string;
  storeDescription?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  slug: string;
  // Branding
  bannerUrl?: string;
  bannerOverlayEnabled?: boolean;
  bannerOverlayColor?: string; // Hex color, default: "#000000"
  bannerOverlayOpacity?: number; // 0-100
  // Typography
  headingFont?: string;
  bodyFont?: string;
  // Featured
  featuredProductIds?: string[];
  // Shipping
  shippingPrice?: number;
  // Hero
  heroText?: string;
  heroTextPosition?: string;
  // Header
  logoSize?: number;
  headerTextSize?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  attributes: Record<string, string>;
  quantity: number;
  sellingPrice?: number;
  imageUrl?: string;
}

export interface WebsiteProduct {
  id: string;
  productId: string;
  companyId: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  categoryPath: string[];
  sellingPrice: number;
  imageUrl?: string; // Deprecated, use imageUrls
  imageUrls?: string[]; // Array of product image URLs (max 3)
  hasVariants: boolean;
  variants?: ProductVariant[];
  inStock: boolean;
  totalStock: number;
  isPublished: boolean;
  // Badge support
  isNew?: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

export interface PublicWebsiteData {
  config: WebsiteConfig;
  products: WebsiteProduct[];
  categories: Category[];
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: {
    street: string;
    city: string;
    postalCode?: string;
    country?: string;
  };
  items: OrderItem[];
  customerNotes?: string;
}

export interface CreateOrderResponse {
  orderId: string;
  orderNumber: string;
}

// Fetch public website data by slug
export async function fetchWebsiteData(
  slug: string
): Promise<PublicWebsiteData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/ecommerce/public/${slug}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch website data");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching website data:", error);
    return null;
  }
}

// Fetch single product
export async function fetchProduct(
  slug: string,
  productId: string
): Promise<WebsiteProduct | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/ecommerce/public/${slug}/products/${productId}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Create order
export async function createOrder(
  companyId: string,
  order: CreateOrderRequest
): Promise<CreateOrderResponse> {
  const response = await fetch(
    `${API_BASE_URL}/ecommerce/orders/${companyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create order");
  }

  return response.json();
}
