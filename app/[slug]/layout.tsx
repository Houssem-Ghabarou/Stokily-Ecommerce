import { fetchWebsiteData } from "@/lib/api";
import { getGoogleFontsUrl, getFontCssVariables } from "@/lib/fonts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchWebsiteData(slug);

  if (!data) {
    return {
      title: "Store Not Found",
    };
  }

  return {
    title: data.config.storeName,
    description:
      data.config.storeDescription || `Shop at ${data.config.storeName}`,
  };
}

export default async function StoreLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const data = await fetchWebsiteData(slug);

  if (!data) {
    notFound();
  }

  const { headingFont, bodyFont } = data.config;
  const fontsUrl = getGoogleFontsUrl(headingFont, bodyFont);
  const fontVars = getFontCssVariables(headingFont, bodyFont);

  // Inject CSS variables for theming and fonts
  const cssVars = `
    :root {
      --primary-color: ${data.config.primaryColor};
      --secondary-color: ${data.config.secondaryColor};
      ${fontVars}
    }
  `;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link href={fontsUrl} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      {children}
    </>
  );
}
