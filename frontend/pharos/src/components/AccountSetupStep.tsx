"use client"
import { useState, useEffect } from 'react'
import { Info, Loader2 } from 'lucide-react';
import { useWeb3Auth  } from './Web3AuthProvider';
import { createUserOp, signUserOp, UserOperation } from '@/utils/userOpUtils';
import { config } from '@/config';
import { API_URL } from '@/constant';
import { serializeUserOp } from '@/utils/serialization';

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
    const [isLoading, setIsLoading] = useState(false);
    const { login, user, loading } = useWeb3Auth();

    // Populate name and email from Web3Auth user data when available
    useEffect(() => {
        if (user) {
            if (user.name && !name) {
                setName(user.name);
            }
            if (user.email && !email) {
                setEmail(user.email);
            }
        }
    }, [user, name, email, setName, setEmail]);

    const handleWeb3AuthLogin = async () => {
        setIsLoading(true);
        try {
            const web3AuthProvider = await login();
            if(!web3AuthProvider) {
                throw new Error("Failed to get Web3Auth provider");
            }
            
            const userOp = await createUserOp(
                web3AuthProvider,
                { to: '0x0000000000000000000000000000000000000000', value: BigInt(0), data: '0x' },
                config.FACTORY_ADDRESS as `0x${string}`,
            );
            
            const signature = await signUserOp(web3AuthProvider, userOp);
            const serializedUserOp = serializeUserOp(userOp);
            
            const response = await fetch(`${API_URL}/api/rpc`, {
                method: 'POST',
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_sendUserOperation',
                    params: [{ ...serializedUserOp, signature }]
                })
            });            
            
            const result = await response.json();
            console.log('UserOp submitted:', result);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Account Setup</h1>
            <p className="text-lg text-gray-600 mb-8">Secure your wallet with Web3Auth</p>

            <div className="bg-white rounded-xl p-8 shadow-lg mb-8 border border-indigo-100">
                {user ? (
                    <div className="space-y-6">
                        <div className="bg-green-50 rounded-lg p-4 mb-6">
                            <p className="text-green-700 font-medium">Successfully connected with Web3Auth!</p>
                        </div>
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-black"
                                placeholder="your@email.com"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                We&apos;ll use this email for important security notifications and recovery.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Secure Authentication</h2>
                            <p className="text-gray-600 mb-6">Connect with Web3Auth to securely set up your account with just a few clicks.</p>
                        </div>
                        
                        <button
                            onClick={handleWeb3AuthLogin}
                            disabled={isLoading || loading}
                            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md cursor-pointer"
                        >
                            {isLoading || loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                "Connect with Web3Auth"
                            )}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 flex items-start border border-indigo-100">
                <Info className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-indigo-900">
                    Web3Auth provides a secure, non-custodial authentication solution that keeps you in control of your wallet.
                </p>
            </div>
        </div>
    );
}
