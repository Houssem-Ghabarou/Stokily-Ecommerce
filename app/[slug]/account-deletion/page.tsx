import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface AccountDeletionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AccountDeletionPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidLocale(slug)) {
    return {
      title: "Account Deletion - Stokily",
    };
  }

  const dict = await getDictionary(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://stokily.com";

  return {
    title: `${dict.accountDeletion.title} - Stokily`,
    description: dict.accountDeletion.description,
    alternates: {
      canonical: `${baseUrl}/${slug}/account-deletion`,
      languages: {
        fr: `${baseUrl}/fr/account-deletion`,
        en: `${baseUrl}/en/account-deletion`,
        ar: `${baseUrl}/ar/account-deletion`,
      },
    },
  };
}

export default async function AccountDeletionPage({
  params,
}: AccountDeletionPageProps) {
  const { slug } = await params;

  // Only allow locale slugs for this page
  if (!isValidLocale(slug)) {
    notFound();
  }

  const dict = await getDictionary(slug);
  const isRtl = slug === "ar";

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
            className={`inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 text-sm font-medium ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <svg
              className={`w-4 h-4 ${isRtl ? "ml-2" : "mr-2"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isRtl
                    ? "M14 5l7 7m0 0l-7 7m7-7H3"
                    : "M10 19l-7-7m0 0l7-7m-7 7h18"
                }
              />
            </svg>
            {dict.accountDeletion.backToHome}
          </Link>

          <div
            className={`prose prose-lg max-w-none ${
              isRtl ? "rtl" : "ltr"
            }`}
          >
            <h1
              className={`text-4xl font-bold text-gray-900 mb-4 ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {dict.accountDeletion.title}
            </h1>
            <p
              className={`text-gray-600 mb-8 ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {dict.accountDeletion.lastUpdated}
            </p>

            <section className="mb-8">
              <h2
                className={`text-2xl font-semibold text-gray-900 mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.introduction.title}
              </h2>
              <p
                className={`text-gray-700 leading-relaxed ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.introduction.content}
              </p>
            </section>

            <section className="mb-8">
              <h2
                className={`text-2xl font-semibold text-gray-900 mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.howToRequest.title}
              </h2>
              <p
                className={`text-gray-700 leading-relaxed mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.howToRequest.content}
              </p>
              <ol
                className={`list-decimal space-y-2 text-gray-700 ${
                  isRtl ? "pr-6 text-right" : "pl-6 text-left"
                }`}
              >
                {dict.accountDeletion.sections.howToRequest.steps.map(
                  (step: string, index: number) => (
                    <li key={index}>{step}</li>
                  )
                )}
              </ol>
            </section>

            <section className="mb-8">
              <h2
                className={`text-2xl font-semibold text-gray-900 mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.whatWeDelete.title}
              </h2>
              <p
                className={`text-gray-700 leading-relaxed mb-3 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.whatWeDelete.intro}
              </p>
              <ul
                className={`list-disc space-y-2 text-gray-700 ${
                  isRtl ? "pr-6 text-right" : "pl-6 text-left"
                }`}
              >
                {dict.accountDeletion.sections.whatWeDelete.items.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </section>

            <section className="mb-8">
              <h2
                className={`text-2xl font-semibold text-gray-900 mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.whatWeKeep.title}
              </h2>
              <p
                className={`text-gray-700 leading-relaxed mb-3 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.whatWeKeep.intro}
              </p>
              <ul
                className={`list-disc space-y-2 text-gray-700 ${
                  isRtl ? "pr-6 text-right" : "pl-6 text-left"
                }`}
              >
                {dict.accountDeletion.sections.whatWeKeep.items.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </section>

            <section className="mb-8">
              <h2
                className={`text-2xl font-semibold text-gray-900 mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.timeline.title}
              </h2>
              <p
                className={`text-gray-700 leading-relaxed ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.timeline.content}
              </p>
            </section>

            <section className="mb-8">
              <h2
                className={`text-2xl font-semibold text-gray-900 mb-4 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.contact.title}
              </h2>
              <p
                className={`text-gray-700 leading-relaxed ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {dict.accountDeletion.sections.contact.content}{" "}
                <a
                  href="mailto:privacy@stokily.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  privacy@stokily.com
                </a>{" "}
                {dict.accountDeletion.sections.contact.or}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


