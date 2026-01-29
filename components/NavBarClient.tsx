'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import MobileNav from '@/components/MobileNav';
import DownloadAppModal from '@/components/DownloadAppModal';

interface NavBarClientProps {
  dict: {
    nav: { features: string; benefits: string; useCases: string; downloadApp: string };
    hero: { title: string; downloadAppStore: string; downloadPlayStore: string; downloadModalTitle: string };
  };
  locale: string;
  appStoreUrl: string;
  playStoreUrl: string;
}

export default function NavBarClient({
  dict,
  locale,
  appStoreUrl,
  playStoreUrl,
}: NavBarClientProps) {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between h-16">
        <Link
          href={`/${locale}`}
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label={dict.hero.title}
        >
          <Image
            src="/stokily/logoBlue.png"
            alt="Stokily Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
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
          <button
            type="button"
            onClick={() => setDownloadModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {dict.nav.downloadApp}
          </button>
        </div>
        <MobileNav
          dict={dict}
          appStoreUrl={appStoreUrl}
          locale={locale}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />
      </div>
      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        appStoreUrl={appStoreUrl}
        playStoreUrl={playStoreUrl}
        modalTitle={dict.hero.downloadModalTitle}
        downloadAppStoreLabel={dict.hero.downloadAppStore}
        downloadPlayStoreLabel={dict.hero.downloadPlayStore}
      />
    </>
  );
}
