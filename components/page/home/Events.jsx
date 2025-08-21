"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hero1 } from "@/app/image";
import axiosInstance from "@/apiInstance/axiosInstance";

const Events = () => {

    const [events, setEvents] = useState([])

    async function handleAllEvents() {
        try {
            const response = await axiosInstance.get(`/event/getAllEvents`)
            setEvents(response?.data?.data)
        } catch (error) {
            console.log("handleAllEvents~eror", error)
        }
    }

    useEffect(() => {
        handleAllEvents()
    }, [])

    return (
        <div className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-6">Events in Surat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/events/${event._id}`}
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
