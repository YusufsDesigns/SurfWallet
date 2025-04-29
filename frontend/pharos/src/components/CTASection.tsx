import React, { useState } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

const CTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle waitlist submission
    console.log('Submitted email:', email);
    setEmail('');
    alert('Thanks for joining our waitlist!');
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
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
  );
};

export default CTASection; 