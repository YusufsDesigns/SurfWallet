"use client"
import React, { useState } from 'react';
import { ArrowRight, Check, Shield, Clock, AlertTriangle } from 'lucide-react';

export default function RecoveryPage() {
  const [step, setStep] = useState(1);
  const [newAddress, setNewAddress] = useState('');
  const [recoveryInitiated, setRecoveryInitiated] = useState(false);
  const [confirmations, setConfirmations] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('47:59:12');

  // For demo purposes - steps of the recovery process
  const handleInitiateRecovery = () => {
    setRecoveryInitiated(true);
    setConfirmations(1); // Assuming the first guardian is initiating
    // In a real app, this would trigger blockchain transaction
    setStep(2);
  };

  const handleCompleteRecovery = () => {
    // In a real app, this would check if timelock has expired
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Quantum Wallet</h1>
            <div className="ml-auto px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Recovery Mode
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-xl mx-auto py-12 px-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            {/* Progress Steps */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > 1 ? <Check className="w-5 h-5" /> : 1}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Initiate</span>
                </div>
                
                <div className="w-full mx-2 mt-4">
                  <div className={`h-1 ${step > 1 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > 2 ? <Check className="w-5 h-5" /> : 2}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Confirm</span>
                </div>
                
                <div className="w-full mx-2 mt-4">
                  <div className={`h-1 ${step > 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > 3 ? <Check className="w-5 h-5" /> : 3}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Wait</span>
                </div>
                
                <div className="w-full mx-2 mt-4">
                  <div className={`h-1 ${step > 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > 4 ? <Check className="w-5 h-5" /> : 4}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">Complete</span>
                </div>
              </div>
            </div>
            
            {/* Step Content */}
            <div className="p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Initiate Wallet Recovery</h2>
                  <p className="text-gray-600 mb-6">
                    To recover access to this wallet, you'll need to provide a new owner address.
                    This process requires approval from the wallet guardians.
                  </p>
                  
                  <div className="mb-6">
                    <label htmlFor="newOwner" className="block text-sm font-medium text-gray-700 mb-2">New Owner Address</label>
                    <input
                      type="text"
                      id="newOwner"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 px-4 sm:text-sm border-gray-300 rounded-lg"
                      placeholder="0x..."
                    />
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-indigo-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-indigo-800">Recovery Requirements</p>
                        <p className="text-sm text-indigo-600 mt-1">
                          This wallet requires 2 out of 3 guardians to approve recovery.
                          After approval, there's a 48-hour timelock before recovery can be completed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleInitiateRecovery}
                    disabled={!newAddress}
                    className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center cursor-pointer"
                  >
                    Initiate Recovery
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Guardian Confirmations</h2>
                  <p className="text-gray-600 mb-6">
                    Recovery has been initiated. Additional guardians need to confirm.
                  </p>
                  
                  <div className="bg-white border border-gray-200 rounded-lg mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Guardian 1 (Alice)</p>
                            <p className="text-sm text-gray-500">0x1234...5678</p>
                          </div>
                        </div>
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm font-medium">Confirmed</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-3">
                            G2
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Guardian 2 (Bob)</p>
                            <p className="text-sm text-gray-500">0xabcd...efgh</p>
                          </div>
                        </div>
                        <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-md text-sm font-medium">Pending</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-3">
                            G3
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Guardian 3 (Carol)</p>
                            <p className="text-sm text-gray-500">0x8765...4321</p>
                          </div>
                        </div>
                        <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-md text-sm font-medium">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 text-sm">Waiting for more confirmations...</p>
                    <p className="text-gray-800 font-medium mt-1">
                      {confirmations} of 2 required confirmations received
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(confirmations/2)*100}%` }}></div>
                    </div>
                  </div>
                  
                  {/* For simulation purposes, let's add a button to advance */}
                  <button 
                    onClick={() => {
                      setConfirmations(2);
                      setStep(3);
                    }}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center cursor-pointer"
                  >
                    Simulate Guardian Confirmation
                  </button>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Waiting Period</h2>
                  
                  <div className="bg-blue-50 p-6 rounded-lg mb-6 text-center">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="font-semibold text-blue-800 text-lg mb-1">Time Remaining</p>
                    <p className="text-3xl font-bold text-blue-900 mb-2">{timeRemaining}</p>
                    <p className="text-sm text-blue-700">
                      Recovery will be available after the security timelock expires
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">Recovery Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">New Owner</span>
                        <span className="font-medium">{newAddress.slice(0, 6)}...{newAddress.slice(-4)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Guardian Confirmations</span>
                        <span className="font-medium">2 of 2 received</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Timelock Ends</span>
                        <span className="font-medium">April 9, 2025, 14:30 UTC</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* For simulation purposes */}
                  <button 
                    onClick={handleCompleteRecovery}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center cursor-pointer"
                  >
                    Simulate Timelock Completion
                  </button>
                </div>
              )}
              
              {step === 4 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Recovery Successful!</h2>
                    <p className="text-gray-600">
                      Your wallet has been successfully recovered. You now have full access with your new key.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">New Owner Address</span>
                      <span className="font-medium">{newAddress.slice(0, 6)}...{newAddress.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Recovery Completed</span>
                      <span className="font-medium">April 9, 2025, 14:30 UTC</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center cursor-pointer"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Help Box */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              If you're having trouble with the recovery process, you have several options:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>Contact your guardians directly to ask them to confirm the recovery</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>Reach out to our support team at support@quantumwallet.io</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">•</span>
                <span>Check our help documentation for detailed recovery instructions</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}