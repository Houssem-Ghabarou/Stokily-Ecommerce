import { WebsiteConfig } from "@/lib/api";
import Image from "next/image";

interface HeroProps {
  config: WebsiteConfig;
}

export default function Hero({ config }: HeroProps) {
  const hasBanner = !!config.bannerUrl;
  const overlayEnabled = config.bannerOverlayEnabled !== false; // Default to true
  const overlayColor = config.bannerOverlayColor || "#000000";
  const overlayOpacity = config.bannerOverlayOpacity ?? 40;
  const heroText = config.heroText || `Welcome to ${config.storeName}`;
  const textPosition = config.heroTextPosition || "center";

  // Position classes mapping
  const positionClasses: Record<string, string> = {
    "top-left": "items-start justify-start text-left",
    "top-center": "items-start justify-center text-center",
    "top-right": "items-start justify-end text-right",
    "center-left": "items-center justify-start text-left",
    "center": "items-center justify-center text-center",
    "center-right": "items-center justify-end text-right",
    "bottom-left": "items-end justify-start text-left",
    "bottom-center": "items-end justify-center text-center",
    "bottom-right": "items-end justify-end text-right",
  };

  const positionClass = positionClasses[textPosition] || positionClasses.center;

  return (
    <section 
      className="relative overflow-hidden" 
      style={{ 
        minHeight: hasBanner ? "75vh" : "auto",
        paddingTop: hasBanner ? "4rem" : "0" // Space for sticky header
      }}
    >
      {/* Background */}
      {hasBanner ? (
        <>
          {/* Banner Image */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${config.bannerUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Subtle default overlay for text readability (always present) */}
          <div
            className="absolute inset-0 bg-black/20"
          />
          {/* Configurable overlay for text readability */}
          {overlayEnabled && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: overlayColor,
                opacity: overlayOpacity / 100,
              }}
            />
          )}
        </>
      ) : (
        /* Gradient Fallback */
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor}20 0%, ${config.primaryColor}08 50%, ${config.secondaryColor}10 100%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative py-20 sm:py-28 lg:py-36 h-full min-h-[75vh] flex">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex ${positionClass}`}>
          <div className="w-full">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-sm"
              style={{ 
                color: hasBanner ? "#ffffff" : config.secondaryColor,
                fontFamily: `var(--font-heading), ${config.headingFont || 'Poppins'}, system-ui, sans-serif`
              }}
            >
              {heroText}
            </h1>
            {config.storeDescription && (
              <p
                className={`text-lg sm:text-xl mb-8 ${
                  hasBanner ? "text-white/90" : "text-gray-600"
                } ${
                  textPosition.includes("left") ? "max-w-2xl" : 
                  textPosition.includes("right") ? "max-w-2xl ml-auto" : 
                  "max-w-2xl mx-auto"
                }`}
                style={{
                  fontFamily: `var(--font-body), ${config.bodyFont || 'Inter'}, system-ui, sans-serif`
                }}
              >
                {config.storeDescription}
              </p>
            )}
            <div className={`flex flex-col sm:flex-row gap-4 ${
              textPosition.includes("left") ? "justify-start" :
              textPosition.includes("right") ? "justify-end" :
              "justify-center"
            } items-center`}>
            <a
              href="#products"
              className="inline-flex items-center px-8 py-3.5 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: config.primaryColor }}
            >
              Shop Now
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            {hasBanner && (
              <a
                href="#products"
                className="inline-flex items-center px-8 py-3.5 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 border-2 border-white/80 text-white"
              >
                Browse Categories
              </a>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave - only show when no banner */}
      {!hasBanner && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </section>
  );
}
