"use client"; // top to the file
import { doctors } from '@/Shared/doctors';
import { motion } from 'framer-motion';
import React from 'react'
import { BiSearch } from 'react-icons/bi';
import ClinicCard from './ClinicCard';
import Testimonial from '../homepage/testimonial/Testimonial';

function Clinics() {
    return (
        <>
            <section className='bg-[#fff9ea]'>
                <div className='container text-center'>
                    <h2 className='heading'>Gaseste un cabinet</h2>

                    <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] flex items-center justify-between rounded-[50px] relative'>

                        {/* <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textColor" size={24} /> */}
                        <input type="search"
                            className='py-4 pl-12 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
                            placeholder="Cauta Cabinet" />
                        <button className='bg-[#0066ff58] py-[15px] px-[35px] text-white font-[600] rounded-r-[50px]'>
                            <BiSearch size={30} />
                        </button>

                    </div>

                    <section>
                        <div className="container">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                                {doctors.map(doctor => (
                                    <ClinicCard key={doctor.id} doctor={doctor} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="xl:w-[470px] mx-auto">
                        <h2 className="heading text-center">Ce zic utlizatorii nostri</h2>
                        <p className="text__para text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt justo eget nunc dignissim lobortis.</p>
                    </div>
                    <Testimonial />
                </div>
            </section>
        </>
    )
}
"/howItWorks/Hospital building-rafiki.svg"
{/* <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textColor" size={24} /> */ }
{/* <motion.div key={index} whileHover={{ scale: 1.3, fontWeight: "bold" }}> */ }
{/* <button className='bg-primaryColor py-[15px] px-[35px] text-white font-[600] rounded-r-[50px]'>
Cauta
</button> */}
export default Clinics