import axios from "axios";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield } from 'lucide-react';
import { useState } from 'react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const SignInForm = ({ formData, handleInputChange, handleNextStep, currentStep, handleBack, otp, setOtp, showPassword, setShowPassword }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [jwtToken, setJwtToken] = useState('');
    const router = useRouter()


    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const startResendTimer = () => {
        setResendTimer(60);
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

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



    const handleLogin = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${BACKEND_URL}/user/login`, {
                email: formData.email,
                password: formData.password,
            });

            setJwtToken(response?.data?.data?.jwtToken);
            toast.success(response.data.message || 'Please verify your email.')
            startResendTimer(); // Start timer when OTP is sent
            handleNextStep(); // Move to OTP step
        } catch (error) {
            console.error('Login error:', error);
            setError(error?.response?.data?.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP verification (step 2)
    const handleOtpVerification = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const otpString = otp.join('');
            const response = await axios.post(`${BACKEND_URL}/user/verify-otp`, {
                otp: otpString
            }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });

            toast.success('Login successfully!');
            // Store the verified token
            localStorage.setItem('token', response?.data?.data.jwtToken);

            setTimeout(() => {
                router.push('/')
            }, 500);

        } catch (error) {
            toast.error('OTP verification error:', error);
            setError(error?.response?.data?.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        setResendLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${BACKEND_URL}/user/login`, {
                email: formData.email,
                password: formData.password,
            });

            setJwtToken(response?.data?.data?.jwtToken);
            toast.success(response.data.message || 'Please verify your email.')
            // toast.success('OTP sent successfully!');
            setOtp(['', '', '', '', '', '']); // Clear current OTP
            startResendTimer(); // Start timer again

        } catch (error) {
            console.error('Resend OTP error:', error);
            toast.error(error?.response?.data?.message || 'Network error. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    if (currentStep === 1) {
        return (
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                <div className="space-y-4 text-black">
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
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={loading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Forgot Password?
                    </button>
                </div> */}

                <button
                    onClick={handleLogin}
                    disabled={!formData.email || !formData.password || loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Signing In...
                        </>
                    ) : (
                        'Continue'
                    )}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                </div>

                <GoogleLoginButton />
            </div>
        );
    }

    if (currentStep === 2) {
        return (
            <div className="space-y-6">
                <button
                    onClick={handleBack}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
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
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                        {success}
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
                        disabled={resendTimer > 0 || resendLoading}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {resendLoading ? (
                            <span className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                Sending...
                            </span>
                        ) : resendTimer > 0 ? (
                            `Resend Code (${resendTimer}s)`
                        ) : (
                            'Resend Code'
                        )}
                    </button>
                </div>

                <button
                    onClick={handleOtpVerification}
                    disabled={otp.some(digit => !digit) || loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Verifying...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </div>
        );
    }
};