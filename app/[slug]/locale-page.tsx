import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/translations";
import { type Locale, isValidLocale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// App Store URLs
const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ||
  "https://apps.apple.com/app/stokily/id6739123456";
const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
  "https://play.google.com/store/apps/details?id=com.stokily.stokily";

// This is the locale landing page component
// It will be imported and used in [slug]/page.tsx when slug is a locale
export default async function LocaleLandingPage({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/stokily/logoBlue.png"
                alt="Stokily Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold text-gray-900">{dict.hero.title}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                {dict.nav.features}
              </a>
              <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">
                {dict.nav.benefits}
              </a>
              <a href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors">
                {dict.nav.useCases}
              </a>
              <LanguageSwitcher />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {dict.nav.downloadApp}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/stokily/logoBlue.png"
                  alt="Stokily Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
                  {dict.hero.title}
                </h1>
              </div>
              <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
                {dict.hero.subtitle}
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {dict.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg w-full sm:w-auto justify-center"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">{dict.hero.downloadAppStore}</div>
                  </div>
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg w-full sm:w-auto justify-center"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.58L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">{dict.hero.downloadPlayStore}</div>
                  </div>
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{dict.hero.worksOffline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{dict.hero.barcodeScanning}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{dict.hero.multiLanguage}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="h-20 bg-blue-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="h-20 bg-purple-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page content - I'll create a separate file for the full content */}
      {/* For now, this is a simplified version */}
    </main>
  );
}

