"use client"
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SecuritySection from '@/components/SecuritySection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}