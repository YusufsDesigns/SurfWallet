"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Plus, Trash2, Shield } from 'lucide-react';

export default function GuardiansPage() {
  const [guardians, setGuardians] = useState([
    { address: '0x1234...5678', name: 'Alice', dateAdded: '2023-03-15' },
    { address: '0xabcd...efgh', name: 'Bob', dateAdded: '2023-03-16' },
  ]);
  
  const [showAddGuardian, setShowAddGuardian] = useState(false);
  const [newGuardian, setNewGuardian] = useState({ address: '', name: '' });
  const [recoveryThreshold, setRecoveryThreshold] = useState(1);
  
  const handleAddGuardian = () => {
    setGuardians([...guardians, {
      address: newGuardian.address,
      name: newGuardian.name,
      dateAdded: new Date().toISOString().split('T')[0]
    }]);
    setNewGuardian({ address: '', name: '' });
    setShowAddGuardian(false);
  };
  
  const handleRemoveGuardian = (address: string) => {
    setGuardians(guardians.filter(g => g.address !== address));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Guardian Management</h1>
            <p className="text-gray-600 mt-1">
              Guardians help you recover your wallet if you lose access to your keys.
            </p>
          </div>
          <button 
            onClick={() => setShowAddGuardian(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Guardian
          </button>
        </div>
        
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Social Recovery Status</h2>
              <p className="text-gray-600 mt-1">
                Your wallet is protected by {guardians.length} guardian{guardians.length !== 1 ? 's' : ''}. 
                {recoveryThreshold > 1 ? ` ${recoveryThreshold} guardians` : ' 1 guardian'} needed to recover your wallet.
              </p>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Threshold</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range" 
                    min="1" 
                    max={Math.max(guardians.length, 1)} 
                    value={recoveryThreshold}
                    onChange={(e) => setRecoveryThreshold(parseInt(e.target.value))}
                    className="w-64"
                  />
                  <span className="font-medium">{recoveryThreshold}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Number of guardians required to recover your wallet
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Guardians List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Your Guardians</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium py-1 px-2 rounded-full">
              {guardians.length} Guardian{guardians.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {guardians.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {guardians.map((guardian) => (
                <div key={guardian.address} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-medium mr-4">
                      {guardian.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{guardian.name}</p>
                      <p className="text-sm text-gray-500">{guardian.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Added {new Date(guardian.dateAdded).toLocaleDateString()}</span>
                    <button 
                      onClick={() => handleRemoveGuardian(guardian.address)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No guardians yet</h3>
              <p className="text-gray-500 mb-4">Add guardians to protect your wallet with social recovery</p>
              <button 
                onClick={() => setShowAddGuardian(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
              >
                Add Your First Guardian
              </button>
            </div>
          )}
        </div>
        
        {/* Explainer Card */}
        <div className="bg-gray-50 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">How Social Recovery Works</h3>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
              <span>Add trusted friends or family members as guardians</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
              <span>If you lose access to your wallet, guardians can help you recover it</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
              <span>The specified number of guardians must approve the recovery</span>
            </li>
            <li className="flex items-start">
              <span className="bg-indigo-100 text-indigo-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
              <span>After a security delay, you can access your wallet with a new key</span>
            </li>
          </ol>
        </div>
      </div>
      
      {/* Add Guardian Modal */}
      {showAddGuardian && (
        <div className="fixed inset-0 bg-[#00000050] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Add Guardian</h3>
              <button 
                onClick={() => setShowAddGuardian(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-2">Guardian Name</label>
                  <input
                    type="text"
                    id="guardianName"
                    value={newGuardian.name}
                    onChange={(e) => setNewGuardian({...newGuardian, name: e.target.value})}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                    placeholder="Enter a name to remember them by"
                  />
                </div>
                
                <div>
                  <label htmlFor="guardianAddress" className="block text-sm font-medium text-gray-700 mb-2">Guardian Address</label>
                  <input
                    type="text"
                    id="guardianAddress"
                    value={newGuardian.address}
                    onChange={(e) => setNewGuardian({...newGuardian, address: e.target.value})}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                    placeholder="0x..."
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    Only add people you trust. Guardians will be able to help recover your wallet if you lose access.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowAddGuardian(false)}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGuardian}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
                disabled={!newGuardian.address || !newGuardian.name}
              >
                Add Guardian
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}