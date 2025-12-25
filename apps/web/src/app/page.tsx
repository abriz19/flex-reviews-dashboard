'use client';

import HeroSection from '@/components/home/HeroSection';
import CityCardsSection from '@/components/home/CityCardsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import DiscountsSection from '@/components/home/DiscountsSection';
import CorporateHousingSection from '@/components/home/CorporateHousingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CityCardsSection />
      <FeaturesSection />
      <DiscountsSection />
      <CorporateHousingSection />
      <TestimonialsSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
