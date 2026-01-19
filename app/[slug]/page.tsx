import { fetchWebsiteData } from "@/lib/api";
import { notFound } from "next/navigation";
import StoreClient from "./StoreClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchWebsiteData(slug);

  if (!data) {
    notFound();
  }

  return (
    <StoreClient
      config={data.config}
      products={data.products}
      categories={data.categories}
      slug={slug}
    />
  );
}
