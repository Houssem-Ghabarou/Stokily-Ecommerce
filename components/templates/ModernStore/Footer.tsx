import { Mail, Phone, MapPin, Store } from "lucide-react";
import { WebsiteConfig } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  config: WebsiteConfig;
  slug?: string;
}

export default function Footer({ config, slug }: FooterProps) {
  const storeUrl = slug ? `/${slug}` : "/";

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="lg:col-span-2">
            <Link href={storeUrl} className="flex items-center gap-3 mb-4">
              {config.logoUrl ? (
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                  <Image
                    src={config.logoUrl}
                    alt={config.storeName}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Store className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-white font-bold text-xl">
                {config.storeName}
              </span>
            </Link>
            {config.storeDescription && (
              <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                {config.storeDescription}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              {config.contactEmail && (
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{config.contactEmail}</span>
                </a>
              )}
              {config.contactPhone && (
                <a
                  href={`tel:${config.contactPhone}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{config.contactPhone}</span>
                </a>
              )}
              {config.address && (
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{config.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${storeUrl}#products`}
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 transform"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href={`${storeUrl}/cart`}
                  className="text-gray-400 hover:text-white text-sm transition-colors inline-block hover:translate-x-1 transform"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {config.storeName}. All rights
            reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Powered by{" "}
            <span
              className="font-medium"
              style={{ color: config.primaryColor }}
            >
              Stokily
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
