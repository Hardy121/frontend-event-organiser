"use client"
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react";

export const LeftPanel = ({ setCurrentView, currentView, eventTitle }) => {

    const tabs = [
        { key: "build", label: "Build event page", description: "Add all of your event details and let attendees know what to expect" },
        { key: "ticket", label: "Add Tickets" },
        { key: "publish", label: "Publish" },
    ];

    return (
        <>
            <div className="lg:hidden w-full border-b border-gray-200 bg-white">
                <div className="flex justify-around text-center w-full">
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            // onClick={() => setCurrentView(tab?.key)}
                            className={`flex-1 py-3 text-sm font-medium ${currentView == tab.key
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500"
                                }`}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:block hidden w-80  border-r border-gray-200 p-6">
                <div className="flex items-center text-blue-600 mb-6 cursor-pointer">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span className="text-sm">Back to events</span>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold line-clamp-1 mb-2">{eventTitle ? eventTitle : "Event Title"}</h2>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Tue, Sep 23, 2025, 10:00 AM</span>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-gray-600">Draft</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-500 mb-4">Steps</div>

                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            onClick={() => setCurrentView(tab?.key)}
                            className="flex items-start space-x-3">
                            <div className={` h-5 border-2 ${currentView == tab?.key ? "border-blue-500 w-7" : "w-5 border-gray-300"}  rounded-full mt-0 flex items-center justify-center`}>
                                {currentView == tab?.key && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}

                            </div>
                            <div>
                                <div className="font-medium text-sm"> {tab.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{tab.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200 flex items-start space-x-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-600 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-yellow-800 font-medium">
                        Note: You can edit your event before publishing.
                    </p>
                </div>

            </div>
        </>
    );
};