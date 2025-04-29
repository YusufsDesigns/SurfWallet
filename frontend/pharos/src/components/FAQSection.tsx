import React from 'react';

const FAQSection = () => {
  return (
    <section id="faq" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about SurfWallet.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">What is a multisig wallet?</h3>
            <p className="text-gray-600">
              A multisig (multi-signature) wallet requires multiple approvals for transactions, adding an extra layer of security compared to traditional wallets that only need one signature to authorize transactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How does social recovery work?</h3>
            <p className="text-gray-600">
              Social recovery allows you to designate trusted contacts as "guardians" who can help you regain access to your wallet if you lose your keys. A specified number of guardians must approve the recovery process to restore access.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">What blockchains do you support?</h3>
            <p className="text-gray-600">
              We currently support Ethereum, Polygon, Arbitrum, and Optimism, with more networks coming soon. Our wallet is compatible with all ERC-20 tokens on these networks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Are there any fees?</h3>
            <p className="text-gray-600">
              Our base wallet service is free to use. You only pay the standard network gas fees for transactions. Premium features for advanced users are available with our Pro subscription.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 