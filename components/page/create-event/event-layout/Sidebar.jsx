// components/layout/Sidebar.js
"use client";
import Link from "next/link";
import { BarChart3, FileText, HelpCircle, Home, Settings, Share2, Users } from "lucide-react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const path = usePathname();

    const SidebarData = [
        {
            name: "home",
            icon: <Home className="w-5 h-5" />,
            link: "/organizations/home",
        },
        {
            name: "event",
            icon: <FileText className="w-5 h-5" />,
            link: "/organizations/event/create",
        },
        {
            name: "order",
            icon: <Share2 className="w-5 h-5" />,
            link: "/organizations/orders",
        },
        {
            name: "stats",
            icon: <BarChart3 className="w-5 h-5" />,
            link: "/",
        },
        {
            name: "users",
            icon: <Users className="w-5 h-5" />,
            link: "/",
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-16 bg-gray-800 flex-col items-center py-4 space-y-6">
                <div className="flex flex-col space-y-4">
                    {SidebarData.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className={`p-2 rounded flex items-center justify-center ${
                                item.link === path ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around py-2 z-50">
                {SidebarData.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className={`flex flex-col items-center justify-center px-3 ${
                            item.link === path ? "text-blue-500" : "text-gray-300"
                        }`}
                    >
                        {item.icon}
                        <span className="text-[10px] mt-1 capitalize">{item.name}</span>
                    </Link>
                ))}
            </div>
        </>
    );
};
