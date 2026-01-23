'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';

export default function LocaleHtml(): null {
  const pathname = usePathname();
  
  useEffect(() => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    if (isValidLocale(firstSegment)) {
      const locale = firstSegment as Locale;
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
  }, [pathname]);
  
  return null;
}

