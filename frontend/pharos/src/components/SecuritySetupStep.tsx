<<<<<<< HEAD
import { Lock, CheckCircle, Info } from 'lucide-react';

export default function SecuritySetupStep({ 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword, 
    isTermsAccepted, 
    setIsTermsAccepted,
    showPasswordTips,
    setShowPasswordTips
  }: { password: string; setPassword: (option: string) => void; confirmPassword: string; setConfirmPassword: (option: string) => void; isTermsAccepted: boolean; setIsTermsAccepted: (option: boolean) => void; showPasswordTips: boolean; setShowPasswordTips: (option: boolean) => void }) {
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
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${confirmPassword && !passwordsMatch() ? 'border-red-500' : 'border-gray-300'
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
}
=======
import { Lock, CheckCircle, Info } from 'lucide-react';

export default function SecuritySetupStep({ 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword, 
    isTermsAccepted, 
    setIsTermsAccepted,
    showPasswordTips,
    setShowPasswordTips
  }: { password: string; setPassword: (option: string) => void; confirmPassword: string; setConfirmPassword: (option: string) => void; isTermsAccepted: boolean; setIsTermsAccepted: (option: boolean) => void; showPasswordTips: boolean; setShowPasswordTips: (option: boolean) => void }) {
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
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${confirmPassword && !passwordsMatch() ? 'border-red-500' : 'border-gray-300'
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
}
>>>>>>> de3a3d3 (Frontend integration and backend bundler)
