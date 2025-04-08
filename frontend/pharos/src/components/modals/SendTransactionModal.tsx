// components/modals/SendTransactionModal.jsx
import React, { useState } from 'react';
import { X, ArrowRight, Clock } from 'lucide-react';

interface Token {
  symbol: string;
  balance: string;
  icon: string;
}

interface SendTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: {
    recipient: string;
    amount: string;
    token: string;
    isScheduled: boolean;
    scheduleDate: string | null;
  }) => void;
}

export default function SendTransactionModal({ isOpen, onClose, onSend }: SendTransactionModalProps) {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  
  const availableTokens: Token[] = [
    { symbol: 'ETH', balance: '1.243', icon: '⟠' },
    { symbol: 'USDC', balance: '1,500.00', icon: '💲' },
    { symbol: 'WBTC', balance: '0.0215', icon: '₿' },
    { symbol: 'LINK', balance: '45.6', icon: '🔗' },
  ];
  
  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle send transaction
      onSend({
        recipient,
        amount,
        token,
        isScheduled,
        scheduleDate: isScheduled ? scheduleDate : null
      });
      onClose();
    }
  };
  
  // Only render if modal is open
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            {step === 1 ? 'Send Assets' : 'Confirm Transaction'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Asset Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset</label>
                <div className="grid grid-cols-2 gap-3">
                  {availableTokens.map((t) => (
                    <button
                      key={t.symbol}
                      onClick={() => setToken(t.symbol)}
                      className={`flex items-center p-3 rounded-lg border ${
                        token === t.symbol 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      } cursor-pointer`}
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg mr-3">
                        {t.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{t.symbol}</p>
                        <p className="text-xs text-gray-500">{t.balance}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-3 sm:text-sm border-gray-300 rounded-lg"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">{token}</span>
                  </div>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-gray-500">Available: {availableTokens.find(t => t.symbol === token)?.balance} {token}</span>
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    onClick={() => {
                      const tokenBalance = availableTokens.find(t => t.symbol === token)?.balance;
                      if (tokenBalance) setAmount(tokenBalance);
                    }}
                  >
                    Max
                  </button>
                </div>
              </div>
              
              {/* Recipient */}
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                  placeholder="0x..."
                />
              </div>
              
              {/* Schedule Option */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-700">Schedule for later</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isScheduled} 
                      onChange={() => setIsScheduled(!isScheduled)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                {isScheduled && (
                  <div className="mt-4">
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-2">Execution Date & Time</label>
                    <input
                      type="datetime-local"
                      id="scheduleDate"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">{amount} {token}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-500">To</span>
                  <span className="font-medium">{recipient.slice(0, 6)}...{recipient.slice(-4)}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-500">Transaction Fee</span>
                  <span className="font-medium">~0.0003 ETH</span>
                </div>
                {isScheduled && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled For</span>
                    <span className="font-medium">{new Date(scheduleDate).toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">                  Please verify all transaction details before confirming. Blockchain transactions are irreversible.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center cursor-pointer"
            disabled={
              (step === 1 && (!recipient || !amount)) ||
              (step === 1 && isScheduled && !scheduleDate)
            }
          >
            {step === 1 ? 'Review' : 'Confirm & Send'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}