import { fetchWebsiteData } from "@/lib/api";
import { notFound } from "next/navigation";
import StoreClient from "./StoreClient";
import { isValidLocale, locales } from "@/lib/i18n";
import LocaleLandingPage from "./locale-landing-page";
import { getDictionary } from "@/lib/translations";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // If it's a locale, generate locale-specific metadata
  if (isValidLocale(slug)) {
    const dict = await getDictionary(slug);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stokily.com';
    
    // Generate alternate language links for hreflang
    const alternates: Record<string, string> = {};
    locales.forEach((locale) => {
      alternates[locale] = `${baseUrl}/${locale}`;
    });
    
    return {
      title: `Stokily - ${dict.hero.subtitle}`,
      description: dict.hero.description,
      keywords: [
        "POS system",
        "inventory management",
        "point of sale",
        "business management",
        "e-commerce",
        "invoicing",
        "barcode scanning",
        "offline POS",
        "retail management",
        "Stokily",
        slug === 'fr' ? "gestion de stock" : slug === 'ar' ? "نظام نقاط البيع" : "stock management",
      ],
      alternates: {
        languages: {
          ...alternates,
          'x-default': `${baseUrl}/fr`,
        },
        canonical: `${baseUrl}/${slug}`,
      },
      openGraph: {
        title: `Stokily - ${dict.hero.subtitle}`,
        description: dict.hero.description,
        url: `${baseUrl}/${slug}`,
        siteName: 'Stokily',
        locale: slug === 'fr' ? 'fr_FR' : slug === 'ar' ? 'ar_SA' : 'en_US',
        alternateLocale: locales
          .filter(l => l !== slug)
          .map(l => l === 'fr' ? 'fr_FR' : l === 'ar' ? 'ar_SA' : 'en_US'),
        images: [
          {
            url: `${baseUrl}/stokily/logoBlue.png`,
            width: 512,
            height: 512,
            alt: 'Stokily Logo',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Stokily - ${dict.hero.subtitle}`,
        description: dict.hero.description,
        images: [`${baseUrl}/stokily/logoBlue.png`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }
  
  // For store pages, return empty metadata so layout's generateMetadata is used
  // The layout will handle all store-specific SEO metadata
  return {};
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;
  
  // Check if slug is a locale (fr, en, ar)
  if (isValidLocale(slug)) {
    // Render the locale landing page
    return <LocaleLandingPage locale={slug} />;
  }
  
  // Otherwise, treat it as a store slug
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
