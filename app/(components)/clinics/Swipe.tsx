// import Image from 'next/image'
// import React from 'react'
// import { Pagination, Navigation, Autoplay, Scrollbar, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css/bundle'
// import { BiRightArrowAlt } from 'react-icons/bi';
// import Link from 'next/link';
// import FormateDate from '@/app/utils/FormateDate';
// import SwiperCore from 'swiper'
// SwiperCore.use([Pagination]);

// function Swipe() {
//     SwiperCore.use([Autoplay])

//     return (
//         <div><Swiper
//             slidesPerView={1}
//             autoplay={{
//                 delay: 2000
//             }}
//             modules={[Navigation, Pagination, Scrollbar]}
//             navigation
//             pagination={{
//                 clickable: true,
//                 el: `swiper-container swiper-container-testClass`,

//             }}
//             scrollbar={{ draggable: true }}>
//             <SwiperSlide>Slide 1</SwiperSlide>
//             <SwiperSlide>Slide 2</SwiperSlide>
//             <SwiperSlide>Slide 3</SwiperSlide>
//             <SwiperSlide>Slide 4</SwiperSlide>
//             <SwiperSlide>Slide 5</SwiperSlide>
//         </Swiper></div>
//     )
// }

// export default Swipe

import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { HiStar } from 'react-icons/hi'
import Image from 'next/image';
import 'swiper/css'
import 'swiper/css/pagination'

function Swipe() {
    return (
        <div className='mt-[30px lg::mt-[55px]'>
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
                }}>
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

export default Swipe