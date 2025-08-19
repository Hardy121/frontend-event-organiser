"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Hero1 } from "@/app/image";

const events = [
    {
        id: 1,
        title: "Masterclass on achieving financial freedom for working professionals",
        date: "Saturday • 2:00 PM",
        location: "starbucks surat",
        price: "Free",
        image: "/events/finance.jpg", 
    },
    {
        id: 2,
        title: "Upcoming Dubai Real Estate Expo in Surat | Book Free Ticket",
        date: "Sat, Aug 30 • 10:00 AM",
        location: "Surat Marriott Hotel",
        price: "Free",
        tag: "Just added",
        image: "/events/dubai-expo.jpg",
    },
    {
        id: 3,
        title: "Global Talent Acquisition: Hiring Free Developers from DI Solutions WorldYD",
        date: "Wed, Dec 31 • 10:00 AM",
        location: "DI Solutions",
        price: "Free",
        image: "/events/global-talent.jpg",
    },
    {
        id: 4,
        title: "5th DAHEJ INDUSTRIAL EXPO 2025",
        date: "Wed, Nov 12 • 10:00 AM",
        location: "Bharuch - Dahej Road",
        price: "Free",
        image: "/events/dahej-expo.jpg",
    },
];

// function to create slug from title
const slugify = (text) =>
    text.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");  

const Events = () => {
    return (
        <div className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-6">Events in Surat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/events/${slugify(event.title)}`}
                    >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="relative h-40 w-full">
                                <Image
                                    src={Hero1}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                                {event.tag && (
                                    <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                                        {event.tag}
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold mb-2">{event.title}</h3>
                                <p className="text-gray-600 text-sm">{event.date}</p>
                                <p className="text-gray-500 text-sm">{event.location}</p>
                                <p className="text-gray-800 text-sm font-medium mt-2">{event.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Events;
