"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Copy, Download, RefreshCw, QrCode } from 'lucide-react';

export default function ReceivePage() {
  const [walletAddress] = useState('0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [copied, setCopied] = useState(false);
  
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💲' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿' },
    { symbol: 'LINK', name: 'Chainlink', icon: '🔗' },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Receive Assets</h1>
        
        {/* QR Code Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="border border-gray-200 rounded-xl p-4 mb-4">
              <div className="bg-gray-50 w-64 h-64 mx-auto flex items-center justify-center">
                <QrCode className="w-48 h-48 text-gray-800" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="font-mono text-sm text-gray-600 truncate max-w-md px-2">
                  {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 8)}
                </span>
                <button 
                  onClick={handleCopyAddress}
                  className="ml-2 p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              {copied && (
                <div className="bg-green-100 text-green-800 text-sm py-1 px-3 rounded-full inline-block">
                  Address copied!
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-4">
              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer">
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Token</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tokens.map((token) => (
                <div
                  key={token.symbol}
                  onClick={() => setSelectedToken(token.symbol)}
                  className={`p-4 rounded-lg cursor-pointer transition flex flex-col items-center ${
                    selectedToken === token.symbol 
                      ? 'bg-indigo-100 border-2 border-indigo-400' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl mb-2 shadow-sm">
                    {token.icon}
                  </div>
                  <span className="font-medium text-gray-800">{token.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Instructions Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Deposit Instructions</h3>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              Only send {selectedToken} tokens to this address. Sending other tokens may result in permanent loss.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex">
              <div className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</div>
              <div>
                <p className="text-gray-800 font-medium">Copy your wallet address or scan the QR code</p>
                <p className="text-gray-600 text-sm">Use the copy button or download the QR code to share with the sender</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</div>
              <div>
                <p className="text-gray-800 font-medium">Send {selectedToken} to this wallet address</p>
                <p className="text-gray-600 text-sm">
                  Make sure you're on the correct network when sending assets
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</div>
              <div>
                <p className="text-gray-800 font-medium">Wait for confirmation</p>
                <p className="text-gray-600 text-sm">
                  Typically takes 1-5 minutes depending on network conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}