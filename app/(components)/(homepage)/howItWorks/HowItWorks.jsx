import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BiRightArrowAlt } from 'react-icons/bi';

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
                        <h2 className='heading text-center'>Servicii medicale de top pentru tine</h2>
                        {/* <p className='text__para text-center whitespace-nowrap'>
                            Găsește rapid cele mai bune opțiuni pentru sănătatea ta
                        </p> */}
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
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> Explorează rețeaua noastră vastă de cabinete medicale și clinici, accesibilă doar prin câteva clicuri</p>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link href="/clinics" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">

                                        <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />

                                    </Link>
                                </motion.div>
                            </div>

                        </motion.div>

                        <motion.div variants={images} className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>

                                <Image
                                    src="/howItWorks/Account-amico.svg"
                                    alt=""
                                    width={400}
                                    height={400}

                                />

                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Creează cont
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> Alătură-te comunității noastre și beneficiezi de acces rapid la servicii medicale de top</p>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link href="/user-register" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                        <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                                    </Link>
                                </motion.div>
                            </div>

                        </motion.div>

                        <motion.div variants={images} className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>

                                <Image
                                    src="/howItWorks/Medical prescription-bro.svg"
                                    alt=""
                                    width={400}
                                    height={400}

                                />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Înregistrează-ți cabinetul
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> Înregistrează-ți cabinetul pe platforma noastră pentru a beneficia de un sistem de programări modern.

                                </p>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Link href="/clinic-register" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                        <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                                    </Link>
                                </motion.div>
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

