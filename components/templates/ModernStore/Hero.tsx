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
          {/* Dark overlay for luxury feel */}
          <div
            className="absolute inset-0 bg-black/40"
          />
          {/* Configurable overlay for text readability */}
          {overlayEnabled && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: overlayColor,
                opacity: (overlayOpacity + 20) / 100,
              }}
            />
          )}
        </>
      ) : (
        /* Dark gradient fallback */
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor}15 0%, #1a1a1a 50%, #0f0f0f 100%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative py-20 sm:py-28 lg:py-36 h-full min-h-[75vh] flex">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex ${positionClass}`}>
          <div className="w-full">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8 drop-shadow-lg"
              style={{ 
                color: hasBanner ? "#ffffff" : 'var(--foreground)',
                fontFamily: 'var(--font-heading), serif',
                letterSpacing: '-1px'
              }}
            >
              {heroText}
            </h1>
            {config.storeDescription && (
              <p
                className={`text-lg sm:text-xl mb-10 font-light ${
                  hasBanner ? "text-white/80" : "text-gray-400"
                } ${
                  textPosition.includes("left") ? "max-w-2xl" : 
                  textPosition.includes("right") ? "max-w-2xl ml-auto" : 
                  "max-w-2xl mx-auto"
                }`}
                style={{
                  fontFamily: 'var(--font-body), system-ui, sans-serif',
                  letterSpacing: '0.5px'
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
              className="inline-flex items-center px-8 py-3 rounded-none text-white font-medium text-sm transition-all duration-300 hover:opacity-80 uppercase tracking-wider"
              style={{ backgroundColor: config.primaryColor }}
            >
              Shop Now
              <svg
                className="ml-2 w-4 h-4"
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
                className="inline-flex items-center px-8 py-3 rounded-none font-medium text-sm transition-all duration-300 hover:bg-white/10 border border-white/60 text-white uppercase tracking-wider"
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
