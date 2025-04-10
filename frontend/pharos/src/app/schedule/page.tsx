"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Clock, AlertTriangle, Check, X, Plus } from 'lucide-react';

export default function SchedulePage() {
  const [scheduledTxs, setScheduledTxs] = useState([
    { 
      id: 1, 
      type: 'send', 
      token: 'ETH',
      amount: '0.5',
      to: '0x1234...5678',
      executeAt: new Date(Date.now() + 86400000), // tomorrow
      status: 'pending'
    },
    { 
      id: 2, 
      type: 'swap', 
      fromToken: 'USDC',
      toToken: 'ETH',
      amount: '500',
      executeAt: new Date(Date.now() + 172800000), // day after tomorrow
      status: 'pending'
    },
    { 
      id: 3, 
      type: 'send', 
      token: 'LINK',
      amount: '25',
      to: '0xabcd...efgh',
      executeAt: new Date(Date.now() - 86400000), // yesterday
      status: 'executed'
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'send',
    token: 'ETH',
    amount: '',
    to: '',
    fromToken: 'USDC',
    toToken: 'ETH',
    executeAt: new Date(Date.now() + 86400000)
  });
  
  const cancelTransaction = (id: number) => {
    setScheduledTxs(scheduledTxs.map(tx => 
      tx.id === id ? {...tx, status: 'cancelled'} : tx
    ));
  };

  const handleScheduleTransaction = () => {
    const newTx = {
      ...newTransaction,
      id: scheduledTxs.length + 1,
      status: 'pending'
    };
    setScheduledTxs([...scheduledTxs, newTx]);
    setShowModal(false);
    setNewTransaction({
      type: 'send',
      token: 'ETH',
      amount: '',
      to: '',
      fromToken: 'USDC',
      toToken: 'ETH',
      executeAt: new Date(Date.now() + 86400000)
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scheduled Transactions</h1>
            <p className="text-gray-600 mt-1">
              Set up transactions to execute automatically at a later time.
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center cursor-pointer"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule Transaction
          </button>
        </div>
        
        {/* Active Scheduled Transactions */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Pending Transactions</h2>
          </div>
          
          {scheduledTxs.filter(tx => tx.status === 'pending').length > 0 ? (
            <div className="divide-y divide-gray-100">
              {scheduledTxs
                .filter(tx => tx.status === 'pending')
                .map(tx => (
                  <div key={tx.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mr-4">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {tx.type === 'send' ? (
                              `Send ${tx.amount} ${tx.token}`
                            ) : (
                              `Swap ${tx.amount} ${tx.fromToken} to ${tx.toToken}`
                            )}
                          </h3>
                          
                          {tx.type === 'send' && (
                            <p className="text-sm text-gray-500 mb-2">To: {tx.to}</p>
                          )}
                          
                          <div className="flex items-center">
                            <div className="flex items-center text-amber-800 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                              <Clock className="w-3 h-3 mr-1" />
                              Executes on {tx.executeAt.toLocaleDateString()} at {tx.executeAt.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => cancelTransaction(tx.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-medium text-gray-900">#{tx.id}</span>
                      </div>
                      
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className="font-medium text-amber-600">Pending execution</span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No pending transactions</h3>
              <p className="text-gray-500">Schedule transactions to execute at a later time</p>
            </div>
          )}
        </div>
        
        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {scheduledTxs
              .filter(tx => tx.status !== 'pending')
              .map(tx => (
                <div key={tx.id} className="p-6">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                      tx.status === 'executed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {tx.status === 'executed' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {tx.type === 'send' ? (
                          `Send ${tx.amount} ${tx.token}`
                        ) : (
                          `Swap ${tx.amount} ${tx.fromToken} to ${tx.toToken}`
                        )}
                      </h3>
                      
                      {tx.type === 'send' && (
                        <p className="text-sm text-gray-500 mb-2">To: {tx.to}</p>
                      )}
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        {tx.status === 'executed' ? (
                          <span>Executed on {tx.executeAt.toLocaleDateString()}</span>
                        ) : (
                          <span>Cancelled</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Transaction ID</span>
                      <span className="font-medium text-gray-900">#{tx.id}</span>
                    </div>
                    
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className={`font-medium ${
                        tx.status === 'executed' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {tx.status === 'executed' ? 'Executed' : 'Cancelled'}
                      </span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
        
        {/* Info Card */}
        <div className="bg-indigo-50 rounded-xl p-6 mt-6">
          <div className="flex items-start">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900 mb-1">About Scheduled Transactions</h3>
              <p className="text-sm text-gray-600">
                Scheduled transactions are executed automatically at the specified time. 
                They require sufficient funds in your wallet at the time of execution. 
                You can cancel a scheduled transaction any time before execution.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Schedule Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#00000050] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Schedule Transaction</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                  >
                    <option value="send">Send</option>
                    <option value="swap">Swap</option>
                  </select>
                </div>
                
                {newTransaction.type === 'send' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                      <select
                        value={newTransaction.token}
                        onChange={(e) => setNewTransaction({...newTransaction, token: e.target.value})}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                      >
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                        <option value="LINK">LINK</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                        type="text"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                      <input
                        type="text"
                        value={newTransaction.to}
                        onChange={(e) => setNewTransaction({...newTransaction, to: e.target.value})}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                        placeholder="0x..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Token</label>
                      <select
                        value={newTransaction.fromToken}
                        onChange={(e) => setNewTransaction({...newTransaction, fromToken: e.target.value})}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                      >
                        <option value="USDC">USDC</option>
                        <option value="ETH">ETH</option>
                        <option value="LINK">LINK</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To Token</label>
                      <select
                        value={newTransaction.toToken}
                        onChange={(e) => setNewTransaction({...newTransaction, toToken: e.target.value})}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                      >
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                        <option value="LINK">LINK</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                        type="text"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                        placeholder="0.0"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Execution Date</label>
                  <input
                    type="datetime-local"
                    value={newTransaction.executeAt.toISOString().slice(0, 16)}
                    onChange={(e) => setNewTransaction({...newTransaction, executeAt: new Date(e.target.value)})}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    Make sure you have sufficient funds in your wallet at the time of execution.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleTransaction}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
                disabled={!newTransaction.amount || (newTransaction.type === 'send' && !newTransaction.to)}
              >
                Schedule Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}