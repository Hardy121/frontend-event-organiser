"use client";
import { Hero1, Hero2, Hero3 } from "@/app/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { useParams } from "next/navigation";
import axiosInstance from "@/apiInstance/axiosInstance";


const EventPage = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const params = useParams();
    console.log("first", params)
    const [ , setEventData] = useState({})

    async function handleEventById() {
        try {
            const response = await axiosInstance(`/event/getAllEvent/${params?.slug}`)
            setEventData(response?.data?.dat)
        } catch (error) {
            console.error('handleEventById ~ error', error)
        }
    }

    useEffect(() => {
        handleEventById()
    }, [])


    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <div className="w-full relative">
                {/* Main Swiper */}
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                        <Image
                            src={Hero1}
                            alt="banner1"
                            width={1920}
                            height={800}
                            className="w-full h-full object-contain"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src={Hero2}
                            alt="banner2"
                            width={1920}
                            height={800}
                            className="w-full h-fit object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src={Hero3}
                            alt="banner3"
                            width={1920}
                            height={800}
                            className="w-full h-fit object-cover"
                        />
                    </SwiperSlide>
                </Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper mt-4"
                >
                    <SwiperSlide>
                        <Image
                            src={Hero1}
                            alt="banner1"
                            width={400}
                            height={200}
                            className="w-full h-fit object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src={Hero2}
                            alt="banner2"
                            width={400}
                            height={200}
                            className="w-full h-fit object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            src={Hero3}
                            alt="banner3"
                            width={400}
                            height={200}
                            className="w-full h-fit object-cover"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-9">

                {/* Left Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Title Section */}
                    <div className="font-sans-serif">
                        <p className="text-black font-semibold text-xl">Saturday, 23 August</p>
                        <h1 className="text-5xl font-bold leading-tight mb-2">
                            Masterclass on achieving financial freedom for working professionals
                        </h1>
                        <p className="text-gray-600">
                            Join us to connect with like-minded individuals, learn valuable financial concepts,
                            and take control of your investments!
                        </p>
                    </div>

                    {/* Date and Time */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Date and time</h2>
                        <p className="text-gray-700">Sat, 23 Aug 2025 14:00 - 16:00 IST</p>
                    </div>

                    {/* Location */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Location</h2>
                        <p className="font-medium">Starbucks Surat</p>
                        <p className="text-gray-600 text-sm">
                            Malviya nagar #Ground Floor Surat, RJ 302017
                        </p>
                        <a href="#" className="text-indigo-600 text-sm mt-1 inline-block">
                            Get directions →
                        </a>
                    </div>

                    {/* About This Event */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">About this event</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Finance meetup for learning personal finance and networking.
                            Come join us for a fun and informative gathering...
                        </p>

                        <ul className="list-disc pl-6 mt-4 text-gray-700 space-y-2">
                            <li>Explore various concepts of personal finance and financial markets</li>
                            <li>Share your experiences and learn from others' journeys</li>
                            <li>Network with like-minded individuals for opportunities</li>
                            <li>Bonus: personalized financial planning sessions</li>
                        </ul>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Frequently asked questions</h2>
                        <p className="text-gray-700">Who is this event for?</p>
                        <p className="text-gray-700">Format of event?</p>
                    </div>

                    {/* Tags */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {["#networking", "#finance", "#meetup", "#learning"].map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white border rounded-xl shadow p-6 space-y-4">
                        <p className="text-gray-500">Free</p>
                        <p className="text-gray-700">Aug 23 · 14:00 GMT+5:30</p>
                        <button className="w-full bg-orange-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-orange-700 transition">
                            Get tickets
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
