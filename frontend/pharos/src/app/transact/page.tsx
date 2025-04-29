"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowUpRight, UserPlus, File, Users, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateMultisigTransactionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [txType, setTxType] = useState('transfer');
  const [transactionDetails, setTransactionDetails] = useState({
    recipient: '',
    amount: '',
    token: 'ETH',
    gasOption: 'standard',
    note: ''
  });

  const [requiredSigners, setRequiredSigners] = useState(2);
  const [availableSigners, setAvailableSigners] = useState([
    { id: 1, name: 'You', address: '0x1234...5678', isOwner: true, selected: true },
    { id: 2, name: 'Alice', address: '0xabcd...efgh', isOwner: false, selected: true },
    { id: 3, name: 'Bob', address: '0x8765...4321', isOwner: false, selected: false }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTransactionDetails({ ...transactionDetails, [name]: value });
  };

  const handleSignerToggle = (signerId: number) => {
    const updatedSigners = availableSigners.map(signer => 
      signer.id === signerId ? { ...signer, selected: !signer.selected } : signer
    );
    // At least one signer must be selected
    if (updatedSigners.some(signer => signer.selected)) {
      setAvailableSigners(updatedSigners);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit transaction
      router.push('/multisig/approvals');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const selectedSignersCount = availableSigners.filter(signer => signer.selected).length;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Multisig Transaction</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          } font-medium`}>
            1
          </div>
          <div className={`h-1 flex-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          } font-medium`}>
            2
          </div>
          <div className={`h-1 flex-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          } font-medium`}>
            3
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm">
          {/* Step 1: Transaction Type */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction Type</h2>
              <p className="text-gray-600 mb-6">Select the kind of transaction you want to create.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer flex items-start ${
                    txType === 'transfer' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setTxType('transfer')}
                >
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <ArrowUpRight className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Transfer Assets</h3>
                    <p className="text-sm text-gray-600">Send tokens to another address</p>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer flex items-start ${
                    txType === 'contract' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setTxType('contract')}
                >
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <File className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Contract Interaction</h3>
                    <p className="text-sm text-gray-600">Execute a contract method</p>
                  </div>
                </div>
              </div>
              
              {/* Transaction Details */}
              {txType === 'transfer' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
                    <input
                      type="text"
                      id="recipient"
                      name="recipient"
                      value={transactionDetails.recipient}
                      onChange={() => handleInputChange}
                      placeholder="0x..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={transactionDetails.amount}
                        onChange={() => handleInputChange}
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">Token</label>
                      <select
                        id="token"
                        name="token"
                        value={transactionDetails.token}
                        onChange={() => handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                        <option value="WBTC">WBTC</option>
                        <option value="LINK">LINK</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="gasOption" className="block text-sm font-medium text-gray-700 mb-1">Gas Option</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        className={`p-3 text-center border rounded-lg cursor-pointer ${
                          transactionDetails.gasOption === 'slow' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setTransactionDetails({...transactionDetails, gasOption: 'slow'})}
                      >
                        <p className="font-medium text-gray-900">Slow</p>
                        <p className="text-xs text-gray-500">~5 min</p>
                      </div>
                      <div
                        className={`p-3 text-center border rounded-lg cursor-pointer ${
                          transactionDetails.gasOption === 'standard' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setTransactionDetails({...transactionDetails, gasOption: 'standard'})}
                      >
                        <p className="font-medium text-gray-900">Standard</p>
                        <p className="text-xs text-gray-500">~2 min</p>
                      </div>
                      <div
                        className={`p-3 text-center border rounded-lg cursor-pointer ${
                          transactionDetails.gasOption === 'fast' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setTransactionDetails({...transactionDetails, gasOption: 'fast'})}
                      >
                        <p className="font-medium text-gray-900">Fast</p>
                        <p className="text-xs text-gray-500">~30 sec</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                    <textarea
                      id="note"
                      name="note"
                      value={transactionDetails.note}
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Add a note about this transaction"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                </div>
              )}
              
              {txType === 'contract' && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <File className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Interaction</h3>
                  <p className="text-gray-600 mb-4">
                    Contract interaction requires ABI input and parameter configuration.
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer">
                    Configure Contract Interaction
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Signers */}
          {step === 2 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Required Signers</h2>
              <p className="text-gray-600 mb-6">
                Select which wallet owners need to approve this transaction and set the required number of approvals.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Approvals: {requiredSigners} of {selectedSignersCount}
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max={selectedSignersCount} 
                  value={requiredSigners}
                  onChange={(e) => setRequiredSigners(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 (Fastest)</span>
                  <span>{selectedSignersCount}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {availableSigners.map(signer => (
                  <div key={signer.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={signer.selected}
                      onChange={() => handleSignerToggle(signer.id)}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{signer.name} ({signer.address})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 3: Review */}
          {step === 3 && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Review Transaction</h2>
              <p className="text-gray-600 mb-6">Please review the transaction details before submitting.</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Transaction Type:</h3>
                  <p className="text-gray-700">{txType === 'transfer' ? 'Transfer Assets' : 'Contract Interaction'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Recipient:</h3>
                  <p className="text-gray-700">{transactionDetails.recipient}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Amount:</h3>
                  <p className="text-gray-700">{transactionDetails.amount} {transactionDetails.token}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Gas Option:</h3>
                  <p className="text-gray-700">{transactionDetails.gasOption}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Note:</h3>
                  <p className="text-gray-700">{transactionDetails.note || 'No note provided'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={handleBack} 
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            disabled={step === 1}
          >
            Back
          </button>
          <button 
            onClick={handleNext} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {step < 3 ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    </MainLayout>
  );
}