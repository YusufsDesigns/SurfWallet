import React from 'react';
import { Shield } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">SecureWallet</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
          <a href="#security" className="text-gray-700 hover:text-indigo-600 transition">Security</a>
          <a href="#faq" className="text-gray-700 hover:text-indigo-600 transition">FAQ</a>
        </div>
        <div>
          <a href="/onboarding" className="hidden md:inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Launch App
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 