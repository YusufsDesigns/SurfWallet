"use client"
import React, { useState } from 'react';
import { Shield, ArrowUpRight, Wallet, Sparkles, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle waitlist submission
    console.log('Submitted email:', email);
    setEmail('');
    alert('Thanks for joining our waitlist!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
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

      {/* Hero Section */}
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

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16 md:py-24">
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

      {/* Security Section */}
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

      {/* Testimonials */}
      {/* <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Users</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our community has to say about SecureWallet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 italic">
              "The multisig feature gives me peace of mind that my funds are secure. Best wallet I've used."
            </p>
            <div>
              <p className="font-medium text-gray-900">Alex Thompson</p>
              <p className="text-gray-500 text-sm">Crypto Investor</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 italic">
              "The interface is so intuitive. Even as a crypto beginner, I found it easy to use from day one."
            </p>
            <div>
              <p className="font-medium text-gray-900">Samantha Lee</p>
              <p className="text-gray-500 text-sm">Designer</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-6 italic">
              "The social recovery feature saved me when I thought I had lost access to my wallet. Incredible service."
            </p>
            <div>
              <p className="font-medium text-gray-900">Michael Chen</p>
              <p className="text-gray-500 text-sm">Software Developer</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about SecureWallet.
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

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="bg-indigo-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to secure your digital assets?</h2>
              <p className="text-indigo-100 mb-8">
                Join our waitlist to be among the first to experience the future of crypto wallets.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition shadow-lg shadow-indigo-800/20"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
            <div className="md:w-1/2 bg-indigo-700 p-12 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="h-16 w-16 text-indigo-200 mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-white mb-2">Early Access Benefits</h3>
                <ul className="text-indigo-100 space-y-2">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Premium features free for 3 months</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Zero transaction fees for 6 months</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Early access to new features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">SecureWallet</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                The next generation smart wallet built for security and simplicity.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Roadmap</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Tutorials</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 SecureWallet. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Legal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}