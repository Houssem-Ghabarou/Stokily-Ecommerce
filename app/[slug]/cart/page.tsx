import { fetchWebsiteData } from "@/lib/api";
import { notFound } from "next/navigation";
import CartClient from "./CartClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CartPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchWebsiteData(slug);

  if (!data) {
    notFound();
  }

  return (
    <CartClient
      config={data.config}
      categories={data.categories}
      slug={slug}
    />
  );
}
