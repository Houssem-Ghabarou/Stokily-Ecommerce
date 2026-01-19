import { fetchWebsiteData } from "@/lib/api";
import { notFound } from "next/navigation";
import CheckoutClient from "./CheckoutClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CheckoutPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchWebsiteData(slug);

  if (!data) {
    notFound();
  }

  return (
    <CheckoutClient
      config={data.config}
      categories={data.categories}
      slug={slug}
    />
  );
}
