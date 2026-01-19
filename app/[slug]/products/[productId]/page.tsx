import { fetchWebsiteData, fetchProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, productId } = await params;

  const [websiteData, product] = await Promise.all([
    fetchWebsiteData(slug),
    fetchProduct(slug, productId),
  ]);

  if (!websiteData || !product) {
    return {
      title: "Product Not Found",
    };
  }

  const { config } = websiteData;
  const title = product.name;
  const description =
    product.description ||
    `${product.name} - ${product.categoryName || "Product"} at ${config.storeName}`;
  const productUrl = `https://${slug}.stokily.com/products/${productId}`;
  const productImage = product.imageUrls?.[0] || product.imageUrl;

  // Format price for display
  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.sellingPrice);

  return {
    title,
    description: `${description} - ${priceFormatted}`,
    openGraph: {
      type: "website",
      siteName: config.storeName,
      title: `${title} - ${priceFormatted}`,
      description,
      url: productUrl,
      images: productImage
        ? [
            {
              url: productImage,
              width: 800,
              height: 800,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${priceFormatted}`,
      description,
      images: productImage || undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug, productId } = await params;

  const [websiteData, product] = await Promise.all([
    fetchWebsiteData(slug),
    fetchProduct(slug, productId),
  ]);

  if (!websiteData || !product) {
    notFound();
  }

  return (
    <ProductDetailClient
      config={websiteData.config}
      product={product}
      categories={websiteData.categories}
      slug={slug}
    />
  );
}
