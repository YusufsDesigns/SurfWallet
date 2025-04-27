"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Shield, Key, Globe, Bell, Moon, Download, ExternalLink, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    transactionUpdates: true,
    securityAlerts: true,
    marketUpdates: false,
    newsletter: false
  });
  
  const [networks, setNetworks] = useState([
    { id: 1, name: 'Ethereum Mainnet', chainId: 1, active: true },
    { id: 2, name: 'Polygon', chainId: 137, active: true },
    { id: 3, name: 'Arbitrum', chainId: 42161, active: false },
    { id: 4, name: 'Optimism', chainId: 10, active: false },
  ]);
  
  const toggleNetwork = (networkId: number) => {
    setNetworks(networks.map(network => 
      network.id === networkId ? { ...network, active: !network.active } : network
    ));
  };

  return (
    <MainLayout>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-transparent bg-opacity-40 backdrop-blur-xs z-10 pointer-events-none"></div>

      {/* Coming Soon text overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none max-h-[90vh]">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-3xl font-bold py-4 px-8 rounded-lg shadow-xl">
        COMING SOON
      </div>
      </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar - Categories */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="font-medium text-gray-600 uppercase text-xs tracking-wider px-5 py-3 bg-gray-50">
                Settings Categories
              </div>
              <div className="divide-y divide-gray-200">
                <a href="#security" className="flex items-center px-5 py-4 bg-indigo-50 border-l-4 border-indigo-600">
                  <Shield className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="font-medium text-indigo-600">Security</span>
                </a>
                <a href="#networks" className="flex items-center px-5 py-4 hover:bg-gray-50 transition">
                  <Globe className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">Networks</span>
                </a>
                <a href="#notifications" className="flex items-center px-5 py-4 hover:bg-gray-50 transition">
                  <Bell className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">Notifications</span>
                </a>
                <a href="#appearance" className="flex items-center px-5 py-4 hover:bg-gray-50 transition">
                  <Moon className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium text-gray-700">Appearance</span>
                </a>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-5 shadow-sm">
              <h3 className="font-medium text-indigo-800 mb-2">Need Help?</h3>
              <p className="text-sm text-indigo-700 mb-4">
                Contact our support team for assistance with your wallet settings.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                Visit Help Center
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Security Settings */}
            <div id="security" className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <Shield className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Security</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Backup Recovery Phrase</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Download an encrypted file containing your wallet's recovery phrase.
                  </p>
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Backup
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-1">Social Recovery Guards</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    You currently have 2 guardians configured.
                  </p>
                  <a href="/guardians" className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div>
                      <span className="font-medium text-gray-900">Manage Guardians</span>
                      <p className="text-sm text-gray-500">Add or remove wallet guardians</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </a>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-1">Session Keys</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage secure session keys for connected applications.
                  </p>
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                    <div>
                      <span className="font-medium text-gray-900">Manage Session Keys</span>
                      <p className="text-sm text-gray-500">3 active sessions</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Network Settings */}
            <div id="networks" className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <Globe className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Networks</h2>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Select which networks your wallet will connect to and display.
                </p>
                
                <div className="space-y-3">
                  {networks.map((network) => (
                    <div key={network.id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{network.name}</span>
                        <p className="text-sm text-gray-500">Chain ID: {network.chainId}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={network.active}
                          onChange={() => toggleNetwork(network.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer">
                    Add Custom Network
                  </button>
                </div>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div id="notifications" className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <Bell className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Configure which notifications you want to receive.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Transaction Updates</span>
                      <p className="text-sm text-gray-500">Get notified about your transaction status</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.transactionUpdates}
                        onChange={() => setNotifications({...notifications, transactionUpdates: !notifications.transactionUpdates})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Security Alerts</span>
                      <p className="text-sm text-gray-500">Important alerts about your wallet's security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.securityAlerts}
                        onChange={() => setNotifications({...notifications, securityAlerts: !notifications.securityAlerts})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Market Updates</span>
                      <p className="text-sm text-gray-500">Price changes and market information</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.marketUpdates}
                        onChange={() => setNotifications({...notifications, marketUpdates: !notifications.marketUpdates})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Newsletter</span>
                      <p className="text-sm text-gray-500">Receive updates about new features and products</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.newsletter}
                        onChange={() => setNotifications({...notifications, newsletter: !notifications.newsletter})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Appearance Settings */}
            <div id="appearance" className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                <Moon className="w-5 h-5 text-indigo-600 mr-3" />
                <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">Dark Mode</span>
                    <p className="text-sm text-gray-500">Use dark theme for the application</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Currency Display</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="px-4 py-3 bg-indigo-50 border-2 border-indigo-400 rounded-lg flex items-center justify-center cursor-pointer">
                      <span className="font-medium text-indigo-700">USD ($)</span>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                      <span className="font-medium text-gray-700">EUR (€)</span>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                      <span className="font-medium text-gray-700">GBP (£)</span>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                      <span className="font-medium text-gray-700">JPY (¥)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}