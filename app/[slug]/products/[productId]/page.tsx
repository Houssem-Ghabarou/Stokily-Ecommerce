import { fetchWebsiteData, fetchProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string; productId: string }>;
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
