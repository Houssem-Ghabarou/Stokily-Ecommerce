import { LandingHero } from '@/components/landing/LandingHero';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingBenefits } from '@/components/landing/LandingBenefits';
import { LandingPricing } from '@/components/landing/LandingPricing';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingFooter } from '@/components/landing/LandingFooter';

export const metadata = {
  title: 'Stokily - The Modern E-Commerce Platform for Store Owners',
  description: 'Build your online empire with Stokily. Inventory management, POS, analytics, and beautiful storefronts - all in one platform. Start free today.',
};

export default function LandingPage() {
  return (
    <main className="bg-white">
      <LandingHero />
      <LandingFeatures />
      <LandingBenefits />
      <LandingPricing />
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}
