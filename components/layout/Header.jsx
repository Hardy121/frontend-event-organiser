"use client";
import React, { useState } from "react";
import { Search, ChevronDown, User, Plus, Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
    const [isOrganizeOpen, setIsOrganizeOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
            <div className="  mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                                <div className="w-4 h-4 bg-white rounded-sm"></div>
                            </div>
                            <span className="text-xl font-bold text-gray-900">eventHub</span>
                        </div>
                    </div>

                    {/* Desktop Search */}
                    {/* <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                        <div className="relative max-w-2xl">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search events"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        </div>
                    </div> */}

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <Link href="/organizations/event/create" className="flex items-center text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium">
                            <Plus className="h-4 w-4 mr-1" />
                            Create an event
                        </Link>

                        {/* Organize Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsOrganizeOpen(!isOrganizeOpen);
                                    setIsUserOpen(false);
                                    setIsHelpOpen(false);
                                }}
                                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                            >
                                Organize
                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOrganizeOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isOrganizeOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Create Event</a>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Manage Events</a>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Event Analytics</a>
                                </div>
                            )}
                        </div>

                        {/* Help Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsHelpOpen(!isHelpOpen);
                                    setIsOrganizeOpen(false);
                                    setIsUserOpen(false);
                                }}
                                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                            >
                                Help
                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isHelpOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isHelpOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Help Center</a>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Contact Support</a>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Community</a>
                                </div>
                            )}
                        </div>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsUserOpen(!isUserOpen);
                                    setIsHelpOpen(false);
                                    setIsOrganizeOpen(false);
                                }}
                                className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                            >
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="hidden sm:block">hardikmerwork@gmail.com</span>
                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isUserOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isUserOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2">
                                    <div className="px-4 py-3 border-b">
                                        <p className="text-sm font-medium">hardikmerwork@gmail.com</p>
                                    </div>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">My Events</a>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Settings</a>
                                    <div className="border-t mt-2 pt-2">
                                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Sign Out</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t shadow-sm px-4 py-4 space-y-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search events"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>
                    <button className="flex items-center text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium w-full">
                        <Plus className="h-4 w-4 mr-1" /> Create an event
                    </button>
                    <hr />
                    <a href="#" className="block text-gray-600 hover:text-gray-900">Organize</a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">Help</a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">Profile</a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">Settings</a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900">Sign Out</a>
                </div>
            )}
        </header>
    );
};

export default Header;
