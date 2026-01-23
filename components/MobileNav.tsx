'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileNavProps {
  dict: {
    nav: {
      features: string;
      benefits: string;
      useCases: string;
      downloadApp: string;
    };
    hero: {
      title: string;
    };
  };
  appStoreUrl: string;
  locale?: string;
}

export default function MobileNav({ dict, appStoreUrl, locale = 'fr' }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isRtl = locale === 'ar';

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Portal content for overlay and sidebar
  const portalContent = (
    <>
      {/* Overlay - Full page coverage */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] md:hidden"
          onClick={closeSidebar}
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : isRtl ? '-translate-x-full' : 'translate-x-full'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{ height: '100vh', top: 0 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Image
                src="/stokily/logoBlue.png"
                alt="Stokily Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-bold text-gray-900">
                {dict.hero.title}
              </span>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <a
                href="#features"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                {dict.nav.features}
              </a>
              <a
                href="#benefits"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                {dict.nav.benefits}
              </a>
              <a
                href="#use-cases"
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                {dict.nav.useCases}
              </a>
            </div>

            {/* Language Switcher */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className={`px-4 text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide ${isRtl ? 'text-right' : 'text-left'}`}>
                {locale === 'fr' ? 'Langue' : locale === 'ar' ? 'اللغة' : 'Language'}
              </p>
              <div className="px-4">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-6 pt-6 border-t border-gray-200 px-4">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeSidebar}
                className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
              >
                {dict.nav.downloadApp}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Portal overlay and sidebar to body */}
      {mounted && typeof window !== 'undefined' && createPortal(portalContent, document.body)}
    </>
  );
}

