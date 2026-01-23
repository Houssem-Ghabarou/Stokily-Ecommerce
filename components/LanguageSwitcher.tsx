'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Languages, ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n';

const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split('/')[1] as Locale;
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

  const switchLocale = (newLocale: Locale) => {
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Languages className="w-4 h-4 text-gray-600" strokeWidth={2} />
        <span className="text-sm font-medium text-gray-700 uppercase">{currentLocale}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" strokeWidth={2} />
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center justify-between ${
              currentLocale === locale 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-gray-700'
            }`}
          >
            <span>{localeNames[locale]}</span>
            <span className="text-xs text-gray-400 uppercase">{locale}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

