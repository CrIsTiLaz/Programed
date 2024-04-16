import Image from 'next/image'
import React from 'react'
import { Pagination, Navigation, Autoplay, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import { BiRightArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import FormateDate from '@/app/utils/FormateDate';
import SwiperCore from 'swiper'
import Swipe from './Swipe';
import { FaLocationDot } from "react-icons/fa6";

function ClinicCarousel() {
    const images = [
        "/temp/cabinet1.jpg",
        "/temp/cabinet2.jpg",
        "/temp/cabinet3.jpg"
    ];
    return (
        <div><Swiper
            navigation
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 3000
            }}
            speed={800}
            modules={[Pagination, Navigation, Scrollbar]}
            className="custom-swiper-container w-full rounded-lg">
            {images.map((imgSrc, index) => (
                <SwiperSlide key={index}>
                    <div className='flex items-center justify-center' style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto "
                            src={imgSrc}
                            alt={`Clinic Slide ${index + 1}`}
                        // className="w-full h-8" // optional
                        />
                    </div>
                </SwiperSlide>

            ))}
        </Swiper></div>
    )
}

export default ClinicCarousel