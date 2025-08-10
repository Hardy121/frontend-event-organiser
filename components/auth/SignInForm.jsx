import { GoogleLoginButton } from "./GoogleLoginButton";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield } from 'lucide-react';


export const SignInForm = ({ formData, handleInputChange, handleNextStep, currentStep, handleBack, otp, setOtp, showPassword, setShowPassword }) => {
    const handleOtpChange = (index, value) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Google Sign In');
    };

    if (currentStep === 1) {
        return (
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Forgot Password?
                    </button>
                </div>

                <button
                    onClick={handleNextStep}
                    disabled={!formData.email || !formData.password}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Continue
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                </div>

                <GoogleLoginButton onClick={handleGoogleSignIn} />
            </div>
        );
    }

    if (currentStep === 2) {
        return (
            <div className="space-y-6">
                <button
                    onClick={handleBack}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-gray-600">
                        We've sent a 6-digit code to <span className="font-medium">{formData.email}</span>
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                        Enter Verification Code
                    </label>
                    <div className="flex justify-center space-x-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Resend Code
                    </button>
                </div>

                <button
                    onClick={handleNextStep}
                    disabled={otp.some(digit => !digit)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Sign In
                </button>
            </div>
        );
    }
};
