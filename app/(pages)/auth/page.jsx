"use client"

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { SignInForm } from '@/components/page/auth/SignInForm';
import { SignUpForm } from '@/components/page/auth/SignUpForm';
import { LeftSide } from '@/components/page/auth/LeftSide';


// Main Component
export default function EventAuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNextStep = () => {
        if (isLogin) {
            if (currentStep === 1) {
                setCurrentStep(2);
            } else if (currentStep === 2) {
                console.log('Login successful');
                setCurrentStep(1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const resetForm = () => {
        setCurrentStep(1);
        setOtp(['', '', '', '', '', '']);
        setFormData({
            email: '',
            password: '',
            fullName: '',
            confirmPassword: ''
        });
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        resetForm();
    };

    const renderStepIndicator = () => {
        const steps = isLogin ? 2 : 3;
        return (
            <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                    {[...Array(steps)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex">
            <LeftSide />

            {/* Right Side - Authentication */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="max-w-md w-full">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">EventHub</h1>
                        <p className="text-gray-600 mt-1">Professional Event Management</p>
                    </div>

                    {/* Step Indicator */}
                    {renderStepIndicator()}

                    {/* Current Step Content */}
                    {isLogin ? (
                        <SignInForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleNextStep={handleNextStep}
                            currentStep={currentStep}
                            handleBack={handleBack}
                            otp={otp}
                            setOtp={setOtp}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    ) : (
                        <SignUpForm
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleNextStep={handleNextStep}
                            currentStep={currentStep}
                            handleBack={handleBack}
                            otp={otp}
                            setOtp={setOtp}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            showConfirmPassword={showConfirmPassword}
                            setShowConfirmPassword={setShowConfirmPassword}
                        />
                    )}

                    {/* Toggle Auth Mode */}
                    {currentStep === 1 && (
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={toggleAuthMode}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </button>
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-gray-500">
                        <p>By continuing, you agree to our</p>
                        <div className="space-x-4 mt-2">
                            <button className="text-blue-600 hover:text-blue-800">Terms of Service</button>
                            <span>•</span>
                            <button className="text-blue-600 hover:text-blue-800">Privacy Policy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}