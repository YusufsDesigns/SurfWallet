import React from 'react';
import { Shield, Wallet, ArrowUpRight } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to manage your digital assets securely and efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Multisig Security</h3>
          <p className="text-gray-600">
            Protect your assets with multi-signature authorization. Require approval from trusted contacts for added security.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <Wallet className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Recovery</h3>
          <p className="text-gray-600">
            Never lose access to your funds with our advanced social recovery system and backup options.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <ArrowUpRight className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Gas Optimization</h3>
          <p className="text-gray-600">
            Save on transaction fees with our intelligent gas optimization and batched transactions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 