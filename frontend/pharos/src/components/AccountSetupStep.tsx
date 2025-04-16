import React, { useState } from 'react'
import { Info } from 'lucide-react';

export default function AccountSetupStep({
    name,
    setName,
    email,
    setEmail
}: {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
}) {
    const [useManualEntry, setUseManualEntry] = useState(false);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Setup</h1>
            <p className="text-lg text-gray-600 mb-8">Choose how you’d like to create your account.</p>

            {/* {!useManualEntry && ( */}
                <div className="mb-8 text-center">
                    <button
                        onClick={() => alert('Trigger Google Auth flow')}
                        className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
                    >
                        <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
                        Continue with Google
                    </button>
                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    {/* <p className="text-indigo-600 font-medium hover:underline">
                        Enter email manually
                    </p> */}
                    <div className="bg-white rounded-xl p-8 shadow-md mb-8 text-left">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                placeholder="your@email.com"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                We'll use this email for important security notifications and recovery.
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            {/* )} */}

            <div className="bg-indigo-50 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-indigo-900">
                    Your information is stored securely and never shared with third parties without your explicit permission.
                </p>
            </div>
        </div>
    );
}

