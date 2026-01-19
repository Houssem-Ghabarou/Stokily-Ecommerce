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

  const { config } = data;
  const title = config.storeName;
  const description =
    config.storeDescription || `Shop at ${config.storeName}`;
  const siteUrl = `https://${slug}.stokily.com`;

  // Determine Open Graph image
  let ogImages: { url: string; width: number; height: number; alt: string }[] | undefined;
  if (config.logoUrl) {
    ogImages = [{ url: config.logoUrl, width: 512, height: 512, alt: title }];
  } else if (config.bannerUrl) {
    ogImages = [{ url: config.bannerUrl, width: 1200, height: 630, alt: title }];
  }

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: config.logoUrl
      ? {
          icon: config.logoUrl,
          shortcut: config.logoUrl,
          apple: config.logoUrl,
        }
      : undefined,
    openGraph: {
      type: "website",
      siteName: title,
      title,
      description,
      url: siteUrl,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: config.bannerUrl || config.logoUrl || undefined,
    },
    metadataBase: new URL(siteUrl),
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
