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
function ClinicCard({ clinic }) {
    const { name, avgRating, totalRating, specialization, medicalGrade } = clinic;
    SwiperCore.use([Autoplay])
    // Array cu imagini predefinite
    const images = [
        "/temp/cabinet1.jpg", // Înlocuiește cu calea corectă a imaginii
        "/temp/cabinet2.jpg", // Înlocuiește cu calea corectă a imaginii
        "/temp/cabinet3.jpg"  // Înlocuiește cu calea corectă a imaginii
    ];

    return (
        <div className='p-3 lg:p-5'>
            <Swiper
                navigation
                pagination={{
                    clickable: true,

                }}
                autoplay={{
                    delay: 3000
                }}
                speed={800}
                modules={[Pagination, Navigation, Scrollbar]}
                className='w-full rounded-lg'>
                {images.map((imgSrc, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex items-center justify-center'>
                            <img
                                className="w-full h-[400px] object-contain  block"
                                src={imgSrc}
                                alt={`Clinic Slide ${index + 1}`}

                            />
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>



            <div className='mt-3'>
                <h2 className='text-[18px] lg:text-[26px] font-bold text-headingColor'>{name}</h2>
                <div className='flex items-center justify-between mt-2'>
                    <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 text-[12px] lg:text-[16px] font-semibold rounded'>
                        {specialization}
                    </span>
                    <div className='flex items-center gap-[6px]'>
                        <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                        <span className='text-rating'>{avgRating} ({totalRating} reviews)</span>
                    </div>
                </div>
            </div>
            <Link className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                href={`/clinics/${clinic._id}`}>
                <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
            </Link>
        </div >

    );
}

export default ClinicCard;
