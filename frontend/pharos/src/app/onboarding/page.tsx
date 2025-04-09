"use client"
import React, { useState } from 'react';
import { Shield, ArrowRight, Check, Lock, Wallet, Sparkles, Users, CheckCircle, Info } from 'lucide-react';

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
        return false; // Welcome page, always enabled
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
        return <AccountSetupStep 
          name={name} 
          setName={setName} 
          email={email} 
          setEmail={setEmail} 
        />;
      case 3:
        return <SecuritySetupStep 
          password={password} 
          setPassword={setPassword} 
          confirmPassword={confirmPassword} 
          setConfirmPassword={setConfirmPassword} 
          isTermsAccepted={isTermsAccepted} 
          setIsTermsAccepted={setIsTermsAccepted}
          showPasswordTips={showPasswordTips}
          setShowPasswordTips={setShowPasswordTips}
        />;
      case 4:
        return <RecoverySetupStep 
          recoveryOption={recoveryOption} 
          setRecoveryOption={setRecoveryOption} 
        />;
      case 5:
        return <CompletionStep name={name} />;
      default:
        return <WelcomeStep />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Header with logo */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">SecureWallet</span>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="container mx-auto px-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: getProgressWidth() }} 
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-8">
          <span>Step {currentStep} of {totalSteps}</span>
          {currentStep < totalSteps && (
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 flex-grow flex flex-col">
        <div className="max-w-2xl mx-auto w-full">
          {renderStepContent()}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-12 mb-8">
            {currentStep > 1 && currentStep < totalSteps ? (
              <button 
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex spacing
            )}
            
            {currentStep < totalSteps && (
              <button 
                onClick={handleNextStep}
                disabled={isNextDisabled()}
                className={`px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium flex items-center ${
                  isNextDisabled() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                } transition shadow-md`}
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 1: Welcome
const WelcomeStep = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="absolute -inset-4 bg-indigo-100 rounded-full opacity-80 blur-xl"></div>
          <div className="relative bg-white p-4 rounded-full">
            <Wallet className="h-16 w-16 text-indigo-600" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to SecureWallet</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        Your journey to secure crypto management starts here. Let's set up your personal wallet in just a few steps.
      </p>
      
      <div className="bg-white rounded-xl p-8 shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Here's what you'll do:</h2>
        
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Create your account</h3>
              <p className="text-gray-600 text-sm">Set up your personal details and credentials</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Configure security settings</h3>
              <p className="text-gray-600 text-sm">Establish your password and security preferences</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Set up recovery options</h3>
              <p className="text-gray-600 text-sm">Ensure you never lose access to your funds</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Get started with your wallet</h3>
              <p className="text-gray-600 text-sm">Begin your crypto journey securely</p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        This process takes about 5 minutes to complete.
      </p>
    </div>
  );
};
// Step 2: Account Setup
const AccountSetupStep: React.FC<{
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
}> = ({ name, setName, email, setEmail }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Setup</h1>
      <p className="text-lg text-gray-600 mb-8">
        Let's create your personal profile for your wallet.
      </p>
      
      <div className="bg-white rounded-xl p-8 shadow-md mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="your@email.com"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              We'll use this email for important security notifications and recovery.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-indigo-900">
          Your information is stored securely and never shared with third parties without your explicit permission.
        </p>
      </div>
    </div>
  );
};

// Step 3: Security Setup
const SecuritySetupStep = ({ 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  isTermsAccepted, 
  setIsTermsAccepted,
  showPasswordTips,
  setShowPasswordTips
}: { password: string; setPassword: (option: string) => void; confirmPassword: string; setConfirmPassword: (option: string) => void; isTermsAccepted: boolean; setIsTermsAccepted: (option: boolean) => void; showPasswordTips: boolean; setShowPasswordTips: (option: boolean) => void }) => {
  const passwordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 5);
  };
  
  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength === 0) return "No password";
    if (strength === 1) return "Very weak";
    if (strength === 2) return "Weak";
    if (strength === 3) return "Fair";
    if (strength === 4) return "Strong";
    return "Very strong";
  };
  
  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return "bg-gray-200";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-500";
    if (strength === 4) return "bg-green-500";
    return "bg-green-600";
  };
  
  const passwordsMatch = () => {
    return password === confirmPassword && password !== '';
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Settings</h1>
      <p className="text-lg text-gray-600 mb-8">
        Create a strong password to protect your wallet.
      </p>
      
      <div className="bg-white rounded-xl p-8 shadow-md mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Create Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordTips(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Create a strong password"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPasswordTips(!showPasswordTips)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>
            
            {/* Password strength meter */}
            <div className="mt-3">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                  style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{getStrengthText()}</span>
                <span className="text-xs text-gray-500">{passwordStrength()} of 5</span>
              </div>
            </div>
            
            {/* Password tips */}
            {showPasswordTips && (
              <div className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className={`mr-2 ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                      {password.length >= 8 ? <CheckCircle className="h-4 w-4" /> : '•'}
                    </span>
                    At least 8 characters
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                      {/[A-Z]/.test(password) ? <CheckCircle className="h-4 w-4" /> : '•'}
                    </span>
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                      {/[0-9]/.test(password) ? <CheckCircle className="h-4 w-4" /> : '•'}
                    </span>
                    At least one number
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-2 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                      {/[^A-Za-z0-9]/.test(password) ? <CheckCircle className="h-4 w-4" /> : '•'}
                    </span>
                    At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                confirmPassword && !passwordsMatch() ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              required
            />
            {confirmPassword && !passwordsMatch() && (
              <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked ? true : false)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"></input>
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4 flex items-start">
        <Lock className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-yellow-800">
          For maximum security, we recommend using a password manager and enabling additional security features after setup.
        </p>
      </div>
    </div>
  );
};
// Step 4: Recovery Setup
const RecoverySetupStep = ({ recoveryOption, setRecoveryOption }: { recoveryOption: string; setRecoveryOption: (option: string) => void }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Recovery</h1>
      <p className="text-lg text-gray-600 mb-8">
        Choose how you want to recover your wallet if you lose access.
      </p>
      
      <div className="bg-white rounded-xl p-8 shadow-md mb-8">
        <div className="space-y-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Select your preferred recovery method:
            </p>
            
            <div className="space-y-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  recoveryOption === 'seed' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setRecoveryOption('seed')}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                    recoveryOption === 'seed' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                  }`}>
                    {recoveryOption === 'seed' && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Seed Phrase</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Generate a 12-word recovery phrase that you'll need to store securely offline. This is the most common and secure method.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  recoveryOption === 'social' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setRecoveryOption('social')}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                    recoveryOption === 'social' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                  }`}>
                    {recoveryOption === 'social' && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Social Recovery</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Designate trusted contacts who can help you recover your wallet. Requires at least 3 guardians to recover your wallet.
                    </p>
                  </div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  recoveryOption === 'multisig' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setRecoveryOption('multisig')}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                    recoveryOption === 'multisig' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'
                  }`}>
                    {recoveryOption === 'multisig' && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Multi-Signature</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Set up a multi-signature arrangement that requires multiple approved devices or keys to access your wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {recoveryOption && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-medium text-indigo-900 mb-2">
                {recoveryOption === 'seed' && 'About Seed Phrases'}
                {recoveryOption === 'social' && 'About Social Recovery'}
                {recoveryOption === 'multisig' && 'About Multi-Signature Recovery'}
              </h4>
              <p className="text-sm text-indigo-800">
                {recoveryOption === 'seed' && 'After completing this setup, you\'ll be shown a 12-word seed phrase. Write it down on paper and store it in a secure location. Never share it with anyone or store it digitally.'}
                {recoveryOption === 'social' && 'You\'ll need to select at least 3 trusted contacts who will help you recover your wallet if needed. They\'ll each receive a unique recovery key that they\'ll need to provide when you initiate recovery.'}
                {recoveryOption === 'multisig' && 'You\'ll set up multiple keys across different devices. To access your wallet, you\'ll need a specific number of these keys (e.g., 2 out of 3). This provides both security and redundancy.'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-600">
          You can change your recovery method later in the wallet settings, but we recommend setting it up now for maximum security.
        </p>
      </div>
    </div>
  );
};
// Step 5: Completion
const CompletionStep = ({ name }: { name: string }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <div className="bg-green-100 rounded-full p-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
        Congratulations {name}! Your SecureWallet is ready to use.
      </p>
      
      <div className="bg-white rounded-xl p-8 shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What's next?</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
              <Wallet className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900 mb-1">Fund Your Wallet</h3>
              <p className="text-gray-600 text-sm">
                Add some funds to your wallet to get started with transactions and investments.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900 mb-1">Complete Security Setup</h3>
              <p className="text-gray-600 text-sm">
                Finish setting up your recovery method and enable additional security features.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900 mb-1">Invite Friends</h3>
              <p className="text-gray-600 text-sm">
                Share SecureWallet with friends to make transfers easier and earn rewards.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1 flex-shrink-0">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900 mb-1">Explore Features</h3>
              <p className="text-gray-600 text-sm">
                Discover all the powerful features available in your new wallet.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <a 
          href="/dashboard" 
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md inline-flex items-center"
        >
          Go to My Wallet
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
};