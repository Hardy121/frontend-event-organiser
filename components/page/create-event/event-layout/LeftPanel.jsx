"use client"
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LeftPanel = () => {

    const path = usePathname();
    const tabs = [
        { key: "build", label: "Build", Link: "/organizations/event/create" },
        { key: "tickets", label: "Add Tickets", Link: "/organizations/event/ticket" },
        { key: "publish", label: "Publish", Link: "/organizations/event/publish" },
    ];
    return (
        <>
            <div className="lg:hidden w-full border-b border-gray-200 bg-white">
                <div className="flex justify-around text-center w-full">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.key}
                            href={tab?.Link}
                            className={`flex-1 py-3 text-sm font-medium ${path === tab.Link
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500"
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="lg:block hidden w-80  border-r border-gray-200 p-6">
                <div className="flex items-center text-blue-600 mb-6 cursor-pointer">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span className="text-sm">Back to events</span>
                </div>

                <div className="mb-6">
                    <div className="w-full h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-4"></div>
                    <h2 className="text-xl font-semibold mb-2">Event Title</h2>
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

                    <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                            <div className="font-medium text-sm">Build event page</div>
                            <div className="text-xs text-gray-500 mt-1">Add all of your event details and let attendees know what to expect</div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5"></div>
                        <div>
                            <div className="font-medium text-sm text-gray-400">Add tickets</div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5"></div>
                        <div>
                            <div className="font-medium text-sm text-gray-400">Publish</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};