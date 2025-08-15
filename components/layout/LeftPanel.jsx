"use client"
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react";

export const LeftPanel = ({ setCurrentView, currentView, eventTitle }) => {

    const tabs = [
        { key: "build", label: "Build event page", description: "Add all of your event details and let attendees know what to expect" },
        { key: "tickets", label: "Add Tickets" },
        { key: "publish", label: "Publish" },
    ];

    return (
        <>
            <div className="lg:hidden w-full border-b border-gray-200 bg-white">
                <div className="flex justify-around text-center w-full">
                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            onClick={() => setCurrentView(tab?.key)}
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
                            // onClick={() => setCurrentView(tab?.key)}
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
            </div>
        </>
    );
};