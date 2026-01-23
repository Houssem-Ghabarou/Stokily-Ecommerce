import type { Metadata } from "next";
import Link from "next/link";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";

interface PrivacyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (!isValidLocale(slug)) {
    return {
      title: "Privacy Policy - Stokily",
    };
  }
  
  const dict = await getDictionary(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://stokily.com';
  
  return {
    title: `${dict.privacy.title} - Stokily`,
    description: dict.privacy.description,
    alternates: {
      canonical: `${baseUrl}/${slug}/privacy`,
      languages: {
        fr: `${baseUrl}/fr/privacy`,
        en: `${baseUrl}/en/privacy`,
        ar: `${baseUrl}/ar/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { slug } = await params;
  
  // Only allow locale slugs for privacy page
  if (!isValidLocale(slug)) {
    notFound();
  }
  
  const dict = await getDictionary(slug);
  const isRtl = slug === 'ar';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${slug}`} className="flex items-center gap-3">
              <Image
                src="/stokily/logoBlue.png"
                alt="Stokily Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Stokily</span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <Link
            href={`/${slug}`}
            className={`inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 text-sm font-medium ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <svg
              className={`w-4 h-4 ${isRtl ? 'ml-2' : 'mr-2'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isRtl ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"}
              />
            </svg>
            {dict.privacy.backToHome}
          </Link>

          <div className={`prose prose-lg max-w-none ${isRtl ? 'rtl' : 'ltr'}`}>
            <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              {dict.privacy.title}
            </h1>
            <p className={`text-gray-600 mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
              {dict.privacy.lastUpdated}
            </p>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.introduction.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.introduction.paragraph1}
              </p>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.introduction.paragraph2}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.title}
              </h2>

              <h3 className={`text-xl font-semibold text-gray-800 mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.accountInfo.title}
              </h3>
              <p className={`text-gray-700 leading-relaxed mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.accountInfo.content}
              </p>

              <h3 className={`text-xl font-semibold text-gray-800 mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.businessData.title}
              </h3>
              <p className={`text-gray-700 leading-relaxed mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.businessData.content}
              </p>

              <h3 className={`text-xl font-semibold text-gray-800 mb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.deviceInfo.title}
              </h3>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.informationWeCollect.deviceInfo.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.permissions.title}
              </h2>
              <ul className={`list-disc space-y-3 text-gray-700 ${isRtl ? 'pr-6 text-right' : 'pl-6 text-left'}`}>
                {dict.privacy.sections.permissions.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.howWeUse.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.howWeUse.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.dataStorage.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.dataStorage.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.yourRights.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.yourRights.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.thirdParty.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.thirdParty.content}
              </p>
            </section>

            <section className="mb-8">
              <h2 className={`text-2xl font-semibold text-gray-900 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.contactUs.title}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {dict.privacy.sections.contactUs.content}{" "}
                <a
                  href="mailto:privacy@stokily.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  privacy@stokily.com
                </a>{" "}
                {dict.privacy.sections.contactUs.or}
              </p>
            </section>

            <div className={`mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-gray-800 font-medium">
                {dict.privacy.consent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

