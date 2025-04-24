import React from 'react';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            The Smart Wallet for the <span className="text-indigo-600">Web3</span> Generation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Secure, simple, and social. Manage your crypto assets with confidence using advanced multisig security and intuitive controls.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/onboarding" className="px-8 py-3 bg-indigo-600 text-white text-center rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Get Started
            </a>
            <a href="#features" className="px-8 py-3 border border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition">
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-100 rounded-full opacity-80 blur-2xl"></div>
            <div className="relative">
              <img src="/smart_wallet_hero.webp" alt="Smart Wallet Interface" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 