import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BiRightArrow, BiRightArrowAlt, BiRightArrowCircle, BiSolidRightArrow } from 'react-icons/bi';

function HowItWorks() {
    // State pentru controlul vizibilității animației
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(); // Ref pentru containerul elementului pe care vrei să îl observi

    // Definițiile animațiilor rămân neschimbate
    const images = {
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0, transition: { duration: 2, ease: "easeInOut" } },
    };
    const variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.5 } },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Atunci când elementul este în viewport, setați isVisible la true
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Opțional, opriți observarea după ce elementul a devenit vizibil
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [containerRef]);

    return (
        <>
            <section ref={containerRef}> {/* Atașați ref la secțiune */}
                <div className='container'>
                    <div className='lg:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>Providing best medical services</h2>
                        <p className='text__para text-center'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt justo eget nunc dignissim lobortis.
                        </p>
                    </div>

                    <motion.div variants={variants} initial='hidden' animate={isVisible ? "show" : "hidden"} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>

                        <motion.div variants={images} className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>
                                <Image
                                    src="/howItWorks/Hospital building-rafiki.svg"
                                    alt=""
                                    width={400}
                                    height={400}
                                />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Gaseste un cabinet
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed tincidunt justo eget nunc dignissim lobortis.</p>

                                <Link href="/schimbat" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                    <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                                </Link>
                            </div>

                        </motion.div>

                        <motion.div variants={images} className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>

                                <Image
                                    src="/howItWorks/Paper map-amico.svg"
                                    alt=""
                                    width={400}
                                    height={400}

                                />

                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Exploreaza cabinetele din zona
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed tincidunt justo eget nunc dignissim lobortis.</p>

                                <Link href="/schimbat" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                    <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                                </Link>
                            </div>

                        </motion.div>

                        <motion.div variants={images} className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>

                                <Image
                                    src="/howItWorks/Calendar-bro.svg"
                                    alt=""
                                    width={400}
                                    height={400}

                                />

                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Fa o programare
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed tincidunt justo eget nunc dignissim lobortis.</p>

                                <Link href="/schimbat" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                    <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                                </Link>
                            </div>

                        </motion.div>


                    </motion.div>

                    {/* <div className='flex flex-wrap items-center flex-col md:flex-row gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>

                    </div> */}

                </div>

            </section>
        </>
    )
}

export default HowItWorks

