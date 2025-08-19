import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image"; 
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Hero1, Hero2, Hero3 } from "@/app/image";
const HeroSec = () => {
    return (
        <>
            <div className="w-full relative">
                <Swiper
                    loop={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="rounded-2xl overflow-hidden mt-2"
                >
                    <SwiperSlide>
                        <Image
                            src={Hero1}
                            alt="banner1"
                            width={1920}
                            height={800}
                            className="w-full h-fit object-cover"
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

                {/* Custom Navigation Buttons */}
                <div className="custom-prev absolute top-1/2 left-4 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow cursor-pointer -translate-y-1/2">
                    <IoChevronBack className="text-black" size={20} />
                </div>
                <div className="custom-next absolute top-1/2 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow cursor-pointer -translate-y-1/2">
                    <IoChevronForward className="text-black" size={20} />
                </div>
            </div>
        </>
    );
}


export default HeroSec