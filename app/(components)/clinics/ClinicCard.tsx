import Image from 'next/image'
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import FormateDate from '@/app/utils/FormateDate';

function ClinicCard({ doctor, appointmentDate, appointmentTime }) {
    // Presupunând că toate aceste date sunt acum incluse în obiectul "doctor"
    const { name, avgRating, totalRating, photo, specialization, totalPatients, hospital } = doctor;
    console.log('appointmentDate', appointmentDate)
    return (
        <div className='p-3 lg:p-5'>
            <div>
                {photo ? (
                    <Image className='w-full ' src={photo} width={200} height={200} alt="User profile photo" />
                ) : (
                    <Image className='w-full ' src="/header/user (4).png" width={200} height={200} alt="Default profile photo" />
                )}
            </div>

            <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>{name}</h2>

            {/* Afișează data și ora dacă sunt furnizate */}
            {appointmentDate && (
                <p className='mt-2 text-[14px] lg:text-[16px] text-headingColor'>
                    Data: {FormateDate(appointmentDate)}
                </p>
            )}

            {appointmentTime && (
                <p className='text-[14px] lg:text-[16px] text-headingColor'>
                    Ora: {appointmentTime}
                </p>
            )}

            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
                 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                    {specialization}
                </span>

                <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] leading-7 font-semibold text-headingColor'>
                        <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                        {avgRating}
                    </span>

                    <span className='text-[14px] leading-6 lg:text-[16px] leading-7 font-[400] text-textColor'>
                        ({totalRating})
                    </span>
                </div>
            </div>

            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div className='flex justify-start flex-grow'>
                    <p className='text-[14px] leading-6 font-[400] text-textColor'>
                        At {hospital}
                    </p>
                </div>

                <Link className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                    href={`/clinics/${doctor._id}`}>
                    <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                </Link>
            </div>
        </div>
    )
}

export default ClinicCard
