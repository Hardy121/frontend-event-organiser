"use client"
import React, { useState } from 'react';
import { Search, ChevronDown, User, Plus } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    const [isOrganizeOpen, setIsOrganizeOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                                </div>
                                <span className="text-xl font-bold text-gray-900">eventbub</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search events"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                            Browse Events
                        </Link>

                        <button className="flex items-center cursor-pointer text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Plus className="h-4 w-4 mr-1" />
                            Create an event
                        </button>

                        {/* Organize Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsOrganizeOpen(!isOrganizeOpen)
                                    setIsUserOpen(false)
                                    setIsHelpOpen(false)
                                }}
                                className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Organize
                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOrganizeOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isOrganizeOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Create Event</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Manage Events</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Event Analytics</a>
                                </div>
                            )}
                        </div>

                        {/* Help Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsHelpOpen(!isHelpOpen)
                                    setIsOrganizeOpen(false)
                                    setIsUserOpen(false)
                                }}
                                className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Help
                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isHelpOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isHelpOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Help Center</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Contact Support</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Community</a>
                                </div>
                            )}
                        </div>

                        {/* User Account */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsUserOpen(!isUserOpen)
                                    setIsHelpOpen(false)
                                    setIsOrganizeOpen(false)
                                }}
                                className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                                    <User className="h-4 w-4 text-gray-600" />
                                </div>
                                <span className="hidden sm:block">hardikmerwork@gmail.com</span>
                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isUserOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isUserOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">hardikmerwork@gmail.com</p>
                                    </div>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Events</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign Out</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;