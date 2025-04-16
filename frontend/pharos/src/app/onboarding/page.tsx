"use client"
import React, { useState } from 'react';
import { Shield, ArrowRight, Check, Lock, Wallet, Sparkles, Users, CheckCircle, Info } from 'lucide-react';
import CompletionStep from '@/components/CompletionStep';
import SecuritySetupStep from '@/components/SecuritySetupStep';
import WelcomeStep from '@/components/WelcomeStep';
import RecoveryStep from '@/components/RecoveryStep';
import AccountSetupStep from '@/components/AccountSetupStep';

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [recoveryOption, setRecoveryOption] = useState('');
  const [showPasswordTips, setShowPasswordTips] = useState(false);

  const totalSteps = 5;

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
      case 3:
        return !password || password !== confirmPassword || !isTermsAccepted;
      case 4:
        return !recoveryOption;
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
        return <SecuritySetupStep password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} isTermsAccepted={isTermsAccepted} setIsTermsAccepted={setIsTermsAccepted} showPasswordTips={showPasswordTips} setShowPasswordTips={setShowPasswordTips} />;
      case 4:
        return <RecoveryStep recoveryOption={recoveryOption} setRecoveryOption={setRecoveryOption} />;
      case 5:
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

// const AccountSetupStep: React.FC<{ name: string; setName: (name: string) => void; email: string; setEmail: (email: string) => void; }> = ({ name, setName, email, setEmail }) => {
//   const [useManualEntry, setUseManualEntry] = useState(false);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Setup</h1>
//       <p className="text-lg text-gray-600 mb-8">Choose how you’d like to create your account.</p>

//       {!useManualEntry && (
//         <div className="bg-white rounded-xl p-8 shadow-md mb-8 text-center">
//           <button
//             onClick={() => alert('Trigger Google Auth flow')}
//             className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition flex items-center justify-center"
//           >
//             <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
//             Continue with Google
//           </button>
//           <div className="my-6 flex items-center">
//             <div className="flex-grow border-t border-gray-300"></div>
//             <span className="mx-4 text-sm text-gray-500">or</span>
//             <div className="flex-grow border-t border-gray-300"></div>
//           </div>
//           <button onClick={() => setUseManualEntry(true)} className="text-indigo-600 font-medium hover:underline">
//             Enter email manually
//           </button>
//         </div>
//       )}

//       {useManualEntry && (
//         <div className="bg-white rounded-xl p-8 shadow-md mb-8">
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                 placeholder="your@email.com"
//                 required
//               />
//               <p className="text-sm text-gray-500 mt-2">
//                 We'll use this email for important security notifications and recovery.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-indigo-50 rounded-lg p-4 flex items-start">
//         <Info className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
//         <p className="text-sm text-indigo-900">
//           Your information is stored securely and never shared with third parties without your explicit permission.
//         </p>
//       </div>
//     </div>
//   );
// };
