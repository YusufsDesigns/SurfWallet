import { Check, Info } from 'lucide-react';
import React, { useState } from 'react'

interface RecoveryStepProps {
    recoveryOption: string;
    setRecoveryOption: (option: string) => void;
}

export default function RecoveryStep({ recoveryOption, setRecoveryOption }: RecoveryStepProps) {
    // const [recoveryOption, setRecoveryOption] = useState('');

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Recovery</h1>
            <p className="text-lg text-gray-600 mb-8">
                Choose how you want to recover your wallet if you lose access.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-md mb-8">
                <div className="space-y-6">
                    <div className="mb-6">
                        <p className="text-gray-700 mb-4">
                            Select your preferred recovery method:
                        </p>

                        <div className="space-y-4">
                            <div
                                className={`border rounded-lg p-4 cursor-pointer transition ${recoveryOption === 'seed' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onClick={() => setRecoveryOption('seed')}
                            >
                                <div className="flex items-start">
                                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${recoveryOption === 'seed' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                                        }`}>
                                        {recoveryOption === 'seed' && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Seed Phrase</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Generate a 12-word recovery phrase that you'll need to store securely offline. This is the most common and secure method.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`border rounded-lg p-4 cursor-pointer transition ${recoveryOption === 'social' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onClick={() => setRecoveryOption('social')}
                            >
                                <div className="flex items-start">
                                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${recoveryOption === 'social' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                                        }`}>
                                        {recoveryOption === 'social' && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Social Recovery</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Designate trusted contacts who can help you recover your wallet. Requires at least 3 guardians to recover your wallet.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`border rounded-lg p-4 cursor-pointer transition ${recoveryOption === 'multisig' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onClick={() => setRecoveryOption('multisig')}
                            >
                                <div className="flex items-start">
                                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${recoveryOption === 'multisig' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                                        }`}>
                                        {recoveryOption === 'multisig' && <Check className="h-3 w-3 text-white" />}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Multi-Signature</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Set up a multi-signature arrangement that requires multiple approved devices or keys to access your wallet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {recoveryOption && (
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <h4 className="font-medium text-indigo-900 mb-2">
                                {recoveryOption === 'seed' && 'About Seed Phrases'}
                                {recoveryOption === 'social' && 'About Social Recovery'}
                                {recoveryOption === 'multisig' && 'About Multi-Signature Recovery'}
                            </h4>
                            <p className="text-sm text-indigo-800">
                                {recoveryOption === 'seed' && 'After completing this setup, you\'ll be shown a 12-word seed phrase. Write it down on paper and store it in a secure location. Never share it with anyone or store it digitally.'}
                                {recoveryOption === 'social' && 'You\'ll need to select at least 3 trusted contacts who will help you recover your wallet if needed. They\'ll each receive a unique recovery key that they\'ll need to provide when you initiate recovery.'}
                                {recoveryOption === 'multisig' && 'You\'ll set up multiple keys across different devices. To access your wallet, you\'ll need a specific number of these keys (e.g., 2 out of 3). This provides both security and redundancy.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                    You can change your recovery method later in the wallet settings, but we recommend setting it up now for maximum security.
                </p>
            </div>
        </div>
    );
}
