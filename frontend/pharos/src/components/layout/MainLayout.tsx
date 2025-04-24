// components/layout/MainLayout.jsx
import React from 'react';
import { Bell, Settings, User, Wallet, Activity, ArrowUpRight, Clock } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">Quantum Wallet</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a href="/dashboard" className="flex items-center px-2 py-3 rounded-lg text-gray-800 bg-indigo-50 group">
            <Wallet className="w-5 h-5 mr-3 text-indigo-600" />
            <span className="font-medium">Assets</span>
          </a>
          
          <a href="/transactions" className="flex items-center px-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 group">
            <Activity className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
            <span>Transactions</span>
          </a>
          
          <a href="/schedule" className="flex items-center px-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 group">
            <Clock className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
            <span>Scheduled</span>
          </a>
          
          <a href="/guardians" className="flex items-center px-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 group">
            <User className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
            <span>Guardians</span>
          </a>
          
          <a href="/settings" className="flex items-center px-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 group">
            <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-600" />
            <span>Settings</span>
          </a>
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">Connected to</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="font-medium">Ethereum Mainnet</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                  JD
                </div>
                <span className="font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}