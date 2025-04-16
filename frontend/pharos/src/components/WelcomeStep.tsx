import React from 'react'
import { Check, Wallet } from 'lucide-react';

export default function WelcomeStep() {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <div className="absolute -inset-4 bg-indigo-100 rounded-full opacity-80 blur-xl"></div>
                    <div className="relative bg-white p-4 rounded-full">
                        <Wallet className="h-16 w-16 text-indigo-600" />
                    </div>
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SecureWallet</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                Your journey to secure crypto management starts here. Let's set up your personal wallet in just a few steps.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Here's what you'll do:</h2>

                <div className="space-y-4 text-left">
                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Create your account</h3>
                            <p className="text-gray-600 text-sm">Set up your personal details and credentials</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Configure security settings</h3>
                            <p className="text-gray-600 text-sm">Establish your password and security preferences</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Set up recovery options</h3>
                            <p className="text-gray-600 text-sm">Ensure you never lose access to your funds</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
                            <Check className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Get started with your wallet</h3>
                            <p className="text-gray-600 text-sm">Begin your crypto journey securely</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                This process takes about 5 minutes to complete.
            </p>
        </div>
    );
}
