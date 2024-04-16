"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import ClinicsAbout from '../DoctorsAbout';
import Feedback from '../Feedback';
import SidePanel from '../SidePanel';
import { BASE_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Services from '../Services';
import ClinicsAbout from '../ClinicsAbout';
import Page from '../Swipe';
import ClinicCarousel from '../ClinicCarousel';
import { FaLocationDot } from "react-icons/fa6";



function ClinicDetails() {
    const [tab, setTab] = useState('despre');
    const params = useParams();
    const id = params.clinicId;
    const { data: clinic, loading, error } = useFetchData(`${BASE_URL}/clinics/${id}`);

    const {
        name,
        averageRating,
        totalRating,
        specialization,
        address,
        phone,
        email,
        services,
        openingHours,
        description
    } = clinic || {};

    if (!clinic) return <div>Nu s-au putut încărca datele clinicii.</div>;

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                {loading && <Loading />}
                {error && <Error errMessage={'Erroare'} />}

                {!loading && !error && (
                    <>
                        {/* Detalii clinica și carusel imagini */}
                        <div className='grid md:grid-cols-2 gap-[50px]'>
                            <div className='flex-1'>
                                <ClinicCarousel />
                            </div>
                            <div className=''> {/* Ajustează lățimea după nevoie */}
                                <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
                                    {name}
                                </h3>
                                <div className='flex items-center gap-[6px] my-2'>
                                    <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                                    <span className='text-rating'>{averageRating} ({totalRating} reviews)</span>
                                </div>
                                <div className='my-3'>
                                    <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 text-[12px] leading-4
                          lg:text-[16px] lg:leading-7 font-semibold rounded'>
                                        {specialization}
                                    </span>
                                </div>
                                <FaLocationDot /> asas
                            </div>

                        </div>

                        {/* Tab buttons */}
                        <div className="mt-4 border-b border-solid border-[#0066ff34]">
                            <button
                                onClick={() => setTab('despre')}
                                className={`py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${tab === 'despre' && 'border-b border-solid border-primaryColor'}`}>
                                Despre
                            </button>
                            <button
                                onClick={() => setTab('servicii')}
                                className={`py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${tab === 'servicii' && 'border-b border-solid border-primaryColor'}`}>
                                Servicii
                            </button>
                        </div>

                        {/* Content based on selected tab */}
                        <div className='mt-3'>
                            {tab === 'despre' && <ClinicsAbout name={name} address={address} email={email} services={services} openingHours={openingHours} description={description} />}
                            {tab === 'servicii' && <Services doctorId={id} />}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default ClinicDetails;

