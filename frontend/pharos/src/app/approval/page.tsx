"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Check, X, Clock, AlertTriangle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export default function MultisigApprovalsPage() {
  const [transactions, setTransactions] = useState([
    { 
      id: 'tx-001',
      type: 'send',
      description: 'Send 0.5 ETH to 0x1234...5678',
      token: 'ETH',
      amount: '0.5',
      recipient: '0x1234...5678',
      approvals: 1,
      threshold: 2,
      createdAt: '2023-04-07T12:30:00',
      status: 'pending',
      expanded: false
    },
    { 
      id: 'tx-002',
      type: 'contract',
      description: 'Approve USDC spending limit for Uniswap',
      contractName: 'USDC Token',
      spender: 'Uniswap V3',
      amount: '500',
      approvals: 2,
      threshold: 3,
      createdAt: '2023-04-06T15:45:00',
      status: 'pending',
      expanded: false
    },
    { 
      id: 'tx-003',
      type: 'send',
      description: 'Send 10 LINK to 0xabcd...efgh',
      token: 'LINK',
      amount: '10',
      recipient: '0xabcd...efgh',
      approvals: 2,
      threshold: 2,
      createdAt: '2023-04-05T09:20:00',
      status: 'executed',
      expanded: false
    }
  ]);
  
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState('');
  
  const handleApproveTransaction = (txId: string) => {
    setTransactions(transactions.map(tx => 
      tx.id === txId 
        ? { ...tx, approvals: tx.approvals + 1, status: (tx.approvals + 1 >= tx.threshold) ? 'executed' : 'pending' } 
        : tx
    ));
  };
  
  const handleRejectTransaction = (txId: string) => {
    setTransactions(transactions.map(tx => 
      tx.id === txId ? { ...tx, status: 'rejected' } : tx
    ));
    setShowRejectionModal(false);
  };
  
  const toggleTransactionDetails = (txId: string) => {
    setTransactions(transactions.map(tx => 
      tx.id === txId ? { ...tx, expanded: !tx.expanded } : tx
    ));
  };
  
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Multisig Approvals</h1>
            <p className="text-gray-600 mt-1">
              Review and approve transactions that require multiple signatures
            </p>
          </div>
        </div>
        
        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="p-6">
                {/* Transaction Header */}
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleTransactionDetails(transaction.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      transaction.status === 'executed' ? 'bg-green-100' : 
                      transaction.status === 'rejected' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {transaction.status === 'executed' ? (
                        <Check className={`w-5 h-5 text-green-600`} />
                      ) : transaction.status === 'rejected' ? (
                        <X className={`w-5 h-5 text-red-600`} />
                      ) : (
                        <Clock className={`w-5 h-5 text-blue-600`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">Created {formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mx-4">
                      <div className="flex -space-x-2">
                        {Array.from({ length: transaction.approvals }).map((_, index) => (
                          <div key={index} className="w-8 h-8 bg-indigo-100 border-2 border-white rounded-full flex items-center justify-center text-indigo-600 font-medium">
                            {index + 1}
                          </div>
                        ))}
                        {Array.from({ length: transaction.threshold - transaction.approvals }).map((_, index) => (
                          <div key={index} className="w-8 h-8 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-gray-400 font-medium">
                            {transaction.approvals + index + 1}
                          </div>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {transaction.approvals}/{transaction.threshold}
                      </span>
                    </div>
                    {transaction.expanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Transaction Details */}
                {transaction.expanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {transaction.type === 'send' ? (
                        <>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Token</p>
                            <p className="font-medium text-gray-900">{transaction.token}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Amount</p>
                            <p className="font-medium text-gray-900">{transaction.amount} {transaction.token}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Recipient</p>
                            <p className="font-medium text-gray-900">{transaction.recipient}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Contract</p>
                            <p className="font-medium text-gray-900">{transaction.contractName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Spender</p>
                            <p className="font-medium text-gray-900">{transaction.spender}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Allowance</p>
                            <p className="font-medium text-gray-900">{transaction.amount} USDC</p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'executed' ? 'bg-green-100 text-green-800' : 
                          transaction.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.status === 'executed' ? 'Executed' : 
                           transaction.status === 'rejected' ? 'Rejected' : 
                           'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    {transaction.status === 'pending' && (
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction.id as string); // Fix: Store transaction ID instead of the object
                            setShowRejectionModal(true);
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveTransaction(transaction.id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                    
                    {transaction.status === 'executed' && (
                      <div className="flex justify-end">
                        <a 
                          href="#" 
                          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                        >
                          View on Explorer
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Pending Transactions</h3>
              <p className="text-gray-500">There are no multisig transactions requiring your approval</p>
            </div>
          )}
        </div>
        
        {/* Explainer Card */}
        <div className="bg-gray-50 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">About Multisig Transactions</h3>
          <p className="text-gray-600 mb-4">
            Multisig transactions require approval from multiple signers before they can be executed.
            This adds an extra layer of security for high-value transactions or operations.
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <Check className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Enhanced Security</p>
                <p className="text-sm text-gray-600">
                  Prevents single-point-of-failure by requiring multiple approvals
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Review Period</p>
                <p className="text-sm text-gray-600">
                  Gives time for all signers to check transaction details before execution
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rejection Modal */}
      {showRejectionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-[#00000050] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Reject Transaction</h3>
              <button 
                onClick={() => setShowRejectionModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-10 h-10 text-yellow-500 mr-4" />
                <div>
                  <h4 className="font-medium text-gray-900">Confirm Rejection</h4>
                  <p className="text-gray-600 text-sm">
                    This will permanently reject this transaction, and it will need to be recreated if needed in the future.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-900">{transactions.find(tx => tx.id === selectedTransaction)?.description}</p> {/* Fix: Access description correctly */}
                <p className="text-sm text-gray-500 mt-1">
                  Currently has {transactions.find(tx => tx.id === selectedTransaction)?.approvals} of {transactions.find(tx => tx.id === selectedTransaction)?.threshold} required approvals
                </p>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowRejectionModal(false)}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectTransaction(selectedTransaction)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition cursor-pointer"
              >
                Reject Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}