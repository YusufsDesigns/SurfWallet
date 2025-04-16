import { Shield, ArrowRight, Wallet, Sparkles, Users, CheckCircle } from 'lucide-react';

export default function CompletionStep({ name }: { name: string }) {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-8">
                <div className="bg-green-100 rounded-full p-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                Congratulations {name}! Your SecureWallet is ready to use.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-md mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What's next?</h2>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
                            <Wallet className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900 mb-1">Fund Your Wallet</h3>
                            <p className="text-gray-600 text-sm">
                                Add some funds to your wallet to get started with transactions and investments.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
                            <Shield className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900 mb-1">Complete Security Setup</h3>
                            <p className="text-gray-600 text-sm">
                                Finish setting up your recovery method and enable additional security features.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
                            <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900 mb-1">Invite Friends</h3>
                            <p className="text-gray-600 text-sm">
                                Share SecureWallet with friends to make transfers easier and earn rewards.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
                            <Sparkles className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-medium text-gray-900 mb-1">Explore Features</h3>
                            <p className="text-gray-600 text-sm">
                                Discover all the powerful features available in your new wallet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <a
                    href="/dashboard"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md inline-flex items-center"
                >
                    Go to My Wallet
                    <ArrowRight className="ml-2 h-5 w-5" />
                </a>
            </div>
        </div>
    );
}
