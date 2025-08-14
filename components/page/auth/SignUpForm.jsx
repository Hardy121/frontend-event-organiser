import { useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const SignUpForm = ({ formData, handleInputChange, handleBack, otp, setOtp, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const router = useRouter()

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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

    const handleNextStep = async () => {
        setLoading(true);
        setError('');

        if (currentStep === 1) {
            try {
                const response = await axios.post(`${baseUrl}/user/get-email`, {
                    name: formData?.fullName,
                    email: formData.email
                });

                if (response?.data?.success) {
                    setJwtToken(response.data.data.jwtToken);
                    setCurrentStep(2);
                    toast.success(response.data.message || 'OTP send successfully')
                } else {
                    toast.error(response.data.message || 'Failed to send OTP')
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
                console.error('Error sending OTP:', error);
            }
        } else if (currentStep === 2) {
            // Step 2: Verify OTP
            try {
                const otpString = otp.join('');
                const response = await axios.post(`${baseUrl}/user/verify-otp`, {
                    otp: otpString
                }, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                if (response?.data?.success) {
                    setJwtToken(response.data.data.jwtToken);
                    setCurrentStep(3);
                    toast.success(response.data.message || 'Verified successfully')
                } else {
                    toast.error(response.data.message || 'Invalid OTP')
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
                // console.error('Error verifying OTP:', error);
            }
        } else if (currentStep === 3) {
            // Step 3: Register user with password
            try {
                const response = await axios.post(`${baseUrl}/user/sign-up`, {
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });

                if (response?.data?.success) {
                    console.log('Signup successful', response.data.data);
                    localStorage.setItem("token", response?.data?.data?.jwtToken);
                    router.push('/')
                    toast.success('Account created successfully!');
                    // setCurrentStep(1);

                    // Reset form if needed
                } else {
                    toast.error(response.data.message || 'Failed to create account');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to create account. Please try again.');
                console.error('Error registering user:', error);
            }
        }
        setLoading(false);
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
        }
    };


    const handleResendOtp = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${baseUrl}/user/get-email`, {
                name: formData?.fullName,
                email: formData.email
            });

            if (response?.data?.success) {
                setJwtToken(response.data.data.jwtToken);
                setOtp(['', '', '', '', '', '']); // Clear OTP inputs
                alert('New OTP sent to your email!');
            } else {
                setError(response.data.message || 'Failed to resend OTP');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
        }

        setLoading(false);
    };

    if (currentStep === 1) {
        return (
            <div className="space-y-6 ">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join EventHub today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4 text-black">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your full name"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

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
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleNextStep}
                    disabled={!formData.fullName || !formData.email || loading}
                    className=" cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                </div>

                <GoogleLoginButton/>
            </div>
        );
    }

    if (currentStep === 2) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => {
                        setCurrentStep(1);
                        setError('');
                    }}
                    className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    disabled={loading}
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

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                        Enter Verification Code
                    </label>
                    <div className="flex justify-center space-x-3 text-black">
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
                                disabled={loading}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    <button
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-sm cursor-pointer text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400"
                    >
                        {loading ? 'Sending...' : 'Resend Code'}
                    </button>
                </div>

                <button
                    onClick={handleNextStep}
                    disabled={otp.some(digit => !digit) || loading}
                    className="w-full bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
            </div>
        );
    }

    if (currentStep === 3) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => {
                        setCurrentStep(2);
                        setError('');
                    }}
                    className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    disabled={loading}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Set Your Password</h2>
                    <p className="text-gray-600">Create a secure password for your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4 text-black">
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
                                placeholder="Create your password"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 cursor-pointer top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={loading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Confirm your password"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={loading}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    <p className="mb-2">Password must contain:</p>
                    <ul className="space-y-1 text-xs">
                        <li className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            At least 8 characters
                        </li>
                        <li className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            One uppercase letter
                        </li>
                        <li className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            One number
                        </li>
                    </ul>
                </div>

                <button
                    onClick={handleNextStep}
                    disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword || loading}
                    className="cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </div>
        );
    }
};