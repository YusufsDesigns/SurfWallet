"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowRight, ChevronDown, CheckCircle, AlertCircle, X, User, Clock, Shield } from 'lucide-react';

export default function TransferPage() {
  const [step, setStep] = useState(1);
  const [selectedToken, setSelectedToken] = useState({
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '1.243',
    value: '$2,486.00',
    icon: '⟠',
    address: '0x0000...'
  });
  
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [customFee, setCustomFee] = useState(false);
  const [feeOption, setFeeOption] = useState('medium');
  const [savedContacts, setSavedContacts] = useState([
    { name: 'Alice', address: '0x1234...5678', recent: true },
    { name: 'Bob', address: '0xabcd...efgh', recent: true },
    { name: 'Carol', address: '0x7890...1234', recent: false }
  ]);
  const [showContacts, setShowContacts] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [isMultisig, setIsMultisig] = useState(false);
  
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '1.243', value: '$2,486.00', icon: '⟠', address: '0x0000...' },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,500.00', value: '$1,500.00', icon: '💲', address: '0xA0b8...' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.0215', value: '$642.80', icon: '₿', address: '0x2260...' },
    { symbol: 'LINK', name: 'Chainlink', balance: '45.6', value: '$547.20', icon: '🔗', address: '0x514910...' }
  ];
  
  const [showTokenList, setShowTokenList] = useState(false);
  
  const handleSelectToken = (token: typeof tokens[0]) => {
    setSelectedToken(token);
    setShowTokenList(false);
  };
  
  const handleSelectContact = (contact: typeof savedContacts[0]) => {
    setRecipient(contact.address);
    setShowContacts(false);
  };
  
  const handleMaxAmount = () => {
    setAmount(selectedToken.balance);
  };
  
  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // In a real app, this would submit the transaction to the blockchain
      setTransactionHash('0x1234...5678');
      setStep(3);
    }
  };
  
  const handleEdit = () => {
    setStep(1);
  };
  
  const renderFeeOption = (option: string, label: string, feeETH: string, feeUSD: string, time: string) => (
    <div
      className={`border rounded-lg p-4 cursor-pointer ${feeOption === option ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
      onClick={() => setFeeOption(option)}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900">{feeETH} ETH</p>
          <p className="text-sm text-gray-500">{feeUSD}</p>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Send {selectedToken.symbol}</h1>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pr-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        onClick={handleMaxAmount}
                        className="px-2 py-1 mr-3 text-xs text-indigo-600 font-medium hover:text-indigo-500 cursor-pointer"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      Balance: {selectedToken.balance} {selectedToken.symbol}
                    </p>
                    <p className="text-sm text-gray-500">
                      Value: {amount ? `$${(parseFloat(amount) * parseFloat(selectedToken.value.replace('$', '').replace(',', '')) / parseFloat(selectedToken.balance.replace(',', ''))).toFixed(2)}` : '$0.00'}
                    </p>
                  </div>
                </div>
                
                {/* Token Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Token</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowTokenList(!showTokenList)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex items-center justify-between w-full py-3 px-4 sm:text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-3">
                          {selectedToken.icon}
                        </div>
                        <div>
                          <p className="font-medium">{selectedToken.symbol}</p>
                          <p className="text-xs text-gray-500">{selectedToken.name}</p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    {showTokenList && (
                      <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {tokens.map((token) => (
                          <div
                            key={token.symbol}
                            className="p-3 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleSelectToken(token)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-3">
                                  {token.icon}
                                </div>
                                <div>
                                  <p className="font-medium">{token.symbol}</p>
                                  <p className="text-xs text-gray-500">{token.name}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{token.balance}</p>
                                <p className="text-xs text-gray-500">{token.value}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Recipient */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Recipient</label>
                    <button
                      onClick={() => setShowContacts(!showContacts)}
                      className="text-xs text-indigo-600 font-medium hover:text-indigo-500 cursor-pointer flex items-center"
                    >
                      <User className="w-3 h-3 mr-1" />
                      Contacts
                    </button>
                  </div>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                    placeholder="0x..."
                  />
                  
                  {showContacts && (
                    <div className="mt-2 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      {savedContacts.map((contact) => (
                        <div
                          key={contact.address}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-0"
                          onClick={() => handleSelectContact(contact)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-medium mr-3">
                                {contact.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-xs text-gray-500">{contact.address}</p>
                              </div>
                            </div>
                            {contact.recent && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Recent</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Toggle for multisig */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Require Multisig</p>
                    <p className="text-sm text-gray-500">Require additional signatures for this transaction</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isMultisig} 
                      onChange={() => setIsMultisig(!isMultisig)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                {/* Transaction Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount</span>
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs mr-2">
                          {selectedToken.icon}
                        </div>
                        <span className="font-medium">{amount} {selectedToken.symbol}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Value</span>
                      <span className="font-medium">
                        {amount ? `$${(parseFloat(amount) * parseFloat(selectedToken.value.replace('$', '').replace(',', '')) / parseFloat(selectedToken.balance.replace(',', ''))).toFixed(2)}` : '$0.00'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">To</span>
                      <span className="font-medium">{recipient}</span>
                    </div>
                    
                    {isMultisig && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Signatures Required</span>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 text-indigo-600 mr-1" />
                          <span className="font-medium">2 of 3</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Network Fee */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">Network Fee</h3>
                    <button
                      onClick={() => setCustomFee(!customFee)}
                      className="text-xs text-indigo-600 font-medium hover:text-indigo-500 cursor-pointer"
                    >
                      {customFee ? 'Use Recommended' : 'Custom'}
                    </button>
                  </div>
                  
                  {!customFee ? (
                    <div className="space-y-3">
                      {renderFeeOption('low', 'Low', '0.0005', '$1.00', '~5 min')}
                      {renderFeeOption('medium', 'Medium', '0.0012', '$2.40', '~1 min')}
                      {renderFeeOption('high', 'High', '0.0021', '$4.20', '~30 sec')}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gas Price (Gwei)</label>
                        <input
                          type="text"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                          placeholder="30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gas Limit</label>
                        <input
                          type="text"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                          placeholder="21000"
                        />
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          Setting custom gas values may result in failed transactions or higher fees than necessary.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Transaction Submitted</h3>
                <p className="text-gray-500 mb-6">
                  Your transaction has been submitted to the network and is waiting for confirmation.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Transaction Hash</span>
                    <span className="font-medium text-indigo-600">{transactionHash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="font-medium">Pending</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={`https://etherscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
                  >
                    View on Explorer
                  </a>
                  <button
                    onClick={() => {
                      setStep(1);
                      setAmount('');
                      setRecipient('');
                    }}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {step < 3 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between">
                {step === 2 ? (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    Edit
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={handleContinue}
                  disabled={step === 1 && (!amount || !recipient)}
                  className={`px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center cursor-pointer ${
                    step === 1 && (!amount || !recipient) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {step === 1 ? 'Continue' : 'Confirm & Send'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Info Card */}
        <div className="bg-indigo-50 rounded-xl p-6 mt-6">
          <div className="flex items-start">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900 mb-1">Transaction Security</h3>
              <p className="text-sm text-gray-600">
                Always verify the recipient address before sending. Blockchain transactions are irreversible and cannot be refunded if sent to the wrong address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}