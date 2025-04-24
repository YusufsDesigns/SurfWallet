"use client"
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowUpRight, ArrowDownLeft, Clock, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWeb3Auth } from '../../components/Web3AuthProvider';
import { useAccount, useBalance } from 'wagmi';
import RPC from "@/app/vIemRPC"

export default function Dashboard() {
    const router = useRouter();
    const { provider, user } = useWeb3Auth();
    const { address } = useAccount();
    const { data: balance } = useBalance({
      address,
    });
  // Sample data
  const balances = [
    { token: 'ETH', amount: '1.243', value: '$2,486.00', icon: '⟠' },
    { token: 'USDC', amount: '1,500.00', value: '$1,500.00', icon: '💲' },
    { token: 'WBTC', amount: '0.0215', value: '$642.80', icon: '₿' },
    { token: 'LINK', amount: '45.6', value: '$547.20', icon: '🔗' },
  ];
  
  const recentTransactions = [
    { type: 'send', token: 'ETH', amount: '0.5', address: '0x1234...5678', time: '2 hours ago' },
    { type: 'receive', token: 'USDC', amount: '250', address: '0xabcd...efgh', time: '5 hours ago' },
    { type: 'send', token: 'LINK', amount: '10', address: '0x8765...4321', time: '1 day ago' },
  ];

  // const getAccounts = async () => {
  //   if (!provider) {
  //     console.log("not init yet")
  //     return;
  //   }
  //   const address = await RPC.getAccounts(provider);
  //   console.log(address);
  //   return address;
  // };

  // const getBalance = async () => {
  //   if (!provider) {
  //     console.log("not init yet")
  //     return;
  //   }
  //   const balance = await RPC.getBalance(provider);
  //   console.log(balance);
  //   return balance;
  // };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Asset Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Assets</h2>
              <span className="text-2xl font-bold text-gray-900">$5,176.00</span>
              <p>Address: {address || "0x00"}</p>
              <p>Balance: {balance?.value || 0}</p>
            </div>
            
            <div className="space-y-4">
              {balances.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-4">
                      {token.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{token.token}</p>
                      <p className="text-sm text-gray-500">{token.amount} {token.token}</p>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">{token.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer" onClick={() => router.push("/send")}>
                <ArrowUpRight className="w-5 h-5 mr-2" />
                Send
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer" onClick={() => router.push("/deposit")}>
                <ArrowDownLeft className="w-5 h-5 mr-2" />
                Receive
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
              <a href="/transactions" className="text-sm text-indigo-600 hover:text-indigo-800">View all</a>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${tx.type === 'send' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {tx.type === 'send' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount} {tx.token}</p>
                      <p className="text-sm text-gray-500">{tx.address}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{tx.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Actions and Security */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center px-4 py-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Token</span>
              </button>
              
              <button className="flex flex-col items-center justify-center px-4 py-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-700">Schedule</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Wallet Security</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-green-800">Social Recovery Active</p>
                  <p className="text-sm text-green-600">2 guardians configured</p>
                </div>
              </div>
            </div>
            
            <a href="/guardians" className="text-sm text-indigo-600 hover:text-indigo-800 block text-center mt-2">Manage guardians</a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}