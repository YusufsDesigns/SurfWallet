"use client"
import React, { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import CompletionStep from '@/components/CompletionStep';
import WelcomeStep from '@/components/WelcomeStep';
import AccountSetupStep from '@/components/AccountSetupStep';

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const totalSteps = 3;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getProgressWidth = () => {
    return `${(currentStep / totalSteps) * 100}%`;
  };

  const isNextDisabled = () => {
    switch(currentStep) {
      case 1:
        return false;
      case 2:
        return !name || !email;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <AccountSetupStep name={name} setName={setName} email={email} setEmail={setEmail} />;
      case 3:
        return <CompletionStep name={name} />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">SecureWallet</span>
        </div>
      </header>

      <div className="container mx-auto px-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-in-out" style={{ width: getProgressWidth() }} />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-8">
          <span>Step {currentStep} of {totalSteps}</span>
          {currentStep < totalSteps && <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>}
        </div>
      </div>

      <div className="container mx-auto px-6 flex-grow flex flex-col">
        <div className="max-w-2xl mx-auto w-full">
          {renderStepContent()}
          <div className="flex justify-between mt-12 mb-8">
            {currentStep > 1 && currentStep < totalSteps ? (
              <button onClick={handlePrevStep} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">Back</button>
            ) : <div></div>}
            {currentStep < totalSteps && (
              <button onClick={handleNextStep} disabled={isNextDisabled()} className={`px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium flex items-center ${isNextDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'} transition shadow-md`}>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
