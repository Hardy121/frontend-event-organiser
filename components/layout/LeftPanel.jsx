"use client"
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const LeftPanel = ({ setCurrentView, currentView, eventTitle, dateTimeInputs }) => {


    // const [isTicketEnable, setIsTicketEnable] = useState(false);
    // const [isPublicEnable, setIsPublicEnable] = useState(false);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         setIsTicketEnable(!!localStorage.getItem("isTicketEnable"));
    //         setIsPublicEnable(!!localStorage.getItem("isPublicEnable"));
    //     }
    // }, []);


    const tabs = [
        { key: "build", label: "Build event page", description: "Add all of your event details and let attendees know what to expect" },
        { key: "ticket", label: "Add Tickets", description: "Add all of your event details and let attendees know what to expect" },
        { key: "publish", label: "Publish", description: "Add all of your event details and let attendees know what to expect" },
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
                        <span>{dateTimeInputs ? `${dateTimeInputs?.date} ${dateTimeInputs?.startTime}` : "2025-08-20 13:45"}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-500 mb-4">Steps</div>

                    {tabs.map((tab) => (
                        <div
                            key={tab.key}
                            onClick={() => setCurrentView(tab?.key)}
                            className={`flex items-start cursor-pointer space-x-3`}>

                            {currentView == tab?.key ?
                                <MdRadioButtonChecked size={30} color="#3659E3" /> :
                                <MdRadioButtonUnchecked size={30} color="#d1d5dc" />
                            }

                            <div>
                                <div className="font-medium text-sm"> {tab.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{tab.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200 flex items-start space-x-3">
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
                </div> */}

            </div>
        </>
    );
};