import React from 'react'
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'

import { HiStar } from 'react-icons/hi'
import Image from 'next/image';
import 'swiper/css'; // baza
import 'swiper/css/navigation'; // pentru navigație
import 'swiper/css/pagination'; // pentru paginare
// ... orice alte module necesare


function Testimonial() {

    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}

                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="testimonial-slide-next">
                <SwiperSlide>
                    <div className="py-[30] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <Image src="/testimonial/undraw_pic_profile_re_7g2h.svg" alt="" width={60} height={60} />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                    Asas ssss
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <blockquote className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            &quot;I have taken medical services from them. They treat so well and they are providing the best medical services.&quot;
                        </blockquote>

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <Image src="/testimonial/undraw_pic_profile_re_7g2h.svg" alt="" width={60} height={60} />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                    Asas ssss
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <blockquote className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            &quot;I have taken medical services from them. They treat so well and they are providing the best medical services.&quot;
                        </blockquote>

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <Image src="/testimonial/undraw_pic_profile_re_7g2h.svg" alt="" width={60} height={60} />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                    Asas ssss
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <blockquote className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            &quot;I have taken medical services from them. They treat so well and they are providing the best medical services.&quot;
                        </blockquote>

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <Image src="/testimonial/undraw_pic_profile_re_7g2h.svg" alt="" width={60} height={60} />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                    Asas ssss
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <blockquote className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            &quot;I have taken medical services from them. They treat so well and they are providing the best medical services.&quot;
                        </blockquote>

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="py-[30] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <Image src="/testimonial/undraw_pic_profile_re_7g2h.svg" alt="" width={60} height={60} />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                    Asas ssss
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <blockquote className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            &quot;I have taken medical services from them. They treat so well and they are providing the best medical services.&quot;
                        </blockquote>

                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Testimonial