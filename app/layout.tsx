import type { Metadata } from "next";
import "./globals.css";
import { defaultLocale } from "@/lib/i18n";
import LocaleHtml from "@/components/LocaleHtml";

export const metadata: Metadata = {
  title: "Stokily - Complete Business Management Solution | POS, Inventory & E-Commerce",
  description:
    "Transform your business with Stokily - the all-in-one platform combining inventory control, point-of-sale, e-commerce, and analytics. Works completely offline. Perfect for retail stores, pharmacies, restaurants, and online shops.",
  icons: {
    icon: [
      { url: "/stokily/logoStokily.png", sizes: "32x32", type: "image/png" },
      { url: "/stokily/logoStokily.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/stokily/logoStokily.png",
    apple: [
      { url: "/stokily/iconIOS.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default to French, will be overridden by LocaleHtml component
  return (
    <html lang={defaultLocale} dir="ltr">
      <body className="antialiased">
        <LocaleHtml />
        {children}
      </body>
    </html>
  );
}
