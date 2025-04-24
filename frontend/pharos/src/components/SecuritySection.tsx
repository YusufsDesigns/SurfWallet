import React from 'react';
import { CheckCircle } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section id="security" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Security First Design</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our wallet is built with security as the foundation. We employ industry-leading practices to keep your assets safe.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Multisignature Protection</h4>
                  <p className="text-gray-600">Require multiple approvals for high-value transactions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Social Recovery Guards</h4>
                  <p className="text-gray-600">Never lose access with trusted guardians who can help recover your wallet</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Threshold Signing</h4>
                  <p className="text-gray-600">Advanced cryptographic protocols for enhanced security</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <img src="/smart_wallet_security.webp" alt="Security Features" className="rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection; 