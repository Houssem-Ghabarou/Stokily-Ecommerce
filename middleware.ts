import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/stokily') ||
    pathname.startsWith('/screenshots') ||
    pathname.includes('.') // static files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If root path or no locale, redirect to default locale
  if (pathname === '/' || !pathnameHasLocale) {
    // Only redirect root path to avoid interfering with [slug] routes
    if (pathname === '/') {
      const locale = defaultLocale;
      const newUrl = new URL(`/${locale}`, request.url);
      return NextResponse.redirect(newUrl);
    }
    // For other paths without locale, let Next.js handle them (like [slug] routes)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|stokily|screenshots).*)',
    '/', // Explicitly match root path
  ],
};

