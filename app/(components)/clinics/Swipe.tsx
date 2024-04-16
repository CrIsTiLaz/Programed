'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function Page() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const images = [
        "/temp/cabinet1.jpg",
        "/temp/cabinet2.jpg",
        "/temp/cabinet3.jpg",

    ];

    return (
        <section className='py-12'>
            <div className='container'>
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className=' rounded-lg'
                >
                    {images.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex items-center justify-center'>
                                <Image
                                    src={imgSrc}
                                    alt={imgSrc}
                                    className='block h-auto w-full object-cover'
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className='thumbs rounded-lg'  // Ajustează marja de la mt-3 la mt-1
                >
                    {images.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                            <button className='flex items-center justify-center'>
                                <Image
                                    src={imgSrc}
                                    alt={imgSrc}
                                    className='block h-auto w-full object-cover'
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    )
}

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'

// import { Swiper, SwiperSlide } from 'swiper/react'



// import 'swiper/css'

// export default function Page() {
//     const [swiper, setSwiper] = useState(null)
//     const [showNavigation, setShowNavigation] = useState(false)
//     const images = [
//         "/temp/cabinet1.jpg",
//         "/temp/cabinet2.jpg",
//         "/temp/cabinet3.jpg"
//     ];
//     return (
//         <section className='relative min-h-screen  py-12 text-white'>
//             <div className='container'>
//                 <div className='my-10 bg-black'>
//                     <button onClick={() => setShowNavigation(open => !open)}>
//                         View All
//                     </button>
//                 </div>

//                 {/* navigation */}
//                 <nav className={`my-10 ${!showNavigation && 'hidden'}`}>
//                     <ul className='flex gap-4'>
//                         {images.map((imgSrc, index) => (
//                             <li key={index}>
//                                 <button
//                                     onClick={() => {
//                                         swiper.slideTo(index)
//                                         // setShowNavigation(false)
//                                     }}
//                                     className='relative block h-20 w-20 overflow-hidden rounded-lg'
//                                 >
//                                     <Image
//                                         src={imgSrc}
//                                         alt={imgSrc}
//                                         className='block h-auto w-full object-cover'
//                                         width={0}
//                                         height={0}
//                                         sizes="100vw"
//                                     />
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>

//                 {/* Main slides */}
//                 <Swiper
//                     spaceBetween={10}
//                     onSwiper={setSwiper}
//                     className='h-96 w-full rounded-lg'
//                 >
//                     {images.map((imgSrc, index) => (
//                         <SwiperSlide key={index}>
//                             <div className='flex h-full w-full items-center justify-center'>
//                                 <Image
//                                     src={imgSrc}
//                                     alt={imgSrc}
//                                     className='block h-auto w-full object-cover'
//                                     width={0}
//                                     height={0}
//                                     sizes="100vw"
//                                 />
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>
//         </section>
//     )
// }

