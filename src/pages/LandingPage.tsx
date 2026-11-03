import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { StationsSection } from '../components/landing/StationsSection';
import { FeaturedGamesSection } from '../components/landing/FeaturedGamesSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { BookingStepsSection } from '../components/landing/BookingStepsSection';
import { CtaBannerSection } from '../components/landing/CtaBannerSection';
import { Footer } from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080711] text-foreground flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <StationsSection />
        <FeaturedGamesSection />
        <FeaturesSection />
        <BookingStepsSection />
        <CtaBannerSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

