import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion"
import PageWrapper from '@/app/pageWrapper';

function Hero() {

    const [startAnimation, setStartAnimation] = useState(false);
    const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const images = {
        hidden: {
            opacity: 0,
            x: 60,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 3
            }
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 100); // Puteți ajusta această întârziere dacă este necesar

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            < PageWrapper>
                <section className='hero__section pt-[60px] 2xl:h-[800px]'>
                    <div className='container'>
                        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>

                            <div>
                                <div className='lg:w-[570px] '>
                                    <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                                        Ajutăm pacienții să trăiască o viață lungă și sănătoasă
                                    </h1>
                                    <p className='text__para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt justo eget nunc dignissim lobortis. Nulla facilisi. Mauris consectetur nisl sit amet arcu condimentum, id tincidunt urna facilisis. Suspendisse potenti. Fusce in consequat justo. Ut vel neque sed lectus condimentum finibus vel nec purus. .</p>
                                    {/* <motion.div whileHover={{ scale: 1.1 }}> */}
                                    <button className='btn margin-left: auto;'>
                                        Solicita o programare
                                    </button>
                                    {/* </motion.div> */}
                                </div>
                                <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[100px] '>
                                    {/* <div>
                                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                                        30+
                                    </h2>
                                    <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]' />

                                    <p>Ani de experienta</p>
                                </div> */}

                                    <div>
                                        <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                                            15+
                                        </h2>
                                        <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]' />

                                        <p>Cabinete</p>
                                    </div>

                                    <div>
                                        <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                                            100%
                                        </h2>
                                        <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]' />

                                        <p>Satisfacția pacienților</p>
                                    </div>

                                </div>
                            </div>

                            <motion.div variants={variants} initial="hidden" animate="show" className='flex gap-[30px] justify-end'>

                                {/* D:\learn\nextJS\qb\query-builder-beta\public\hero\ */}
                                <motion.img src="/hero/undraw_doctors_p6aq (1).svg" alt="" width={400} height={400} variants={images} />

                                {/* query-builder-beta\public\hero\undraw_medicine_b-1-ol.svg */}
                                {/* <div className='mt-[30px] animate-slideIn'>
                                <Image src="/hero/hero-img01.png" alt="" className='w-full mb-[30px]' width={200} height={200} />
                                <Image src="/hero/hero-img01.png" alt="" className='w-full ' width={100} height={100} />
                            </div> */}
                            </motion.div>

                        </div>

                    </div>

                </section>
            </PageWrapper>
        </>
    )
}

export default Hero