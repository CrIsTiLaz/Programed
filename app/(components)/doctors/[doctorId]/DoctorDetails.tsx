"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ClinicsAbout from '../DoctorsAbout';
import Feedback from '../Feedback';
import SidePanel from '../SidePanel';
import { BASE_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Services from '../Services';

// function usePathId() {
//     const [id, setId] = useState(null);

//     useEffect(() => {
//         // Această abordare funcționează doar pe client side
//         const pathSegments = window.location.pathname.split('/');
//         const idSegment = pathSegments[2]; // Asumând că URL-ul este /clinics/[id]
//         setId(idSegment);
//     }, []);

//     return id;
// }



function ClinicsDetails() {

    const [tab, setTab] = useState('despre');

    // const id = usePathId();
    const params = useParams()
    const id = params.doctorId
    // console.log('id', id)
    // console.log('ID:', id);

    const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`);

    // console.log('url: )', (`${BASE_URL}/doctors/${id}`))
    // console.log('data', doctor)

    const {
        name = '',
        qualifications = [],
        experiences = [],
        timeSlots = [],
        reviews = [],
        bio = '',
        about = '',
        averageRating = 0,
        totalRating = 0,
        specialization = '',
        medicalGrade = '',
        ticketPrice = '',
        photo = ''
    } = doctor || {}; // Folosește un obiect gol ca fallback
    if (!doctor) return <div>Nu s-au putut încărca datele doctorului.</div>;
    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>

                {loading && <Loading />}
                {error && <Error errMessage={'erroarea'} />}

                {!loading && !error && (<div className='grid md:grid-cols-3 gap-[50px]'>
                    <div className='md:col-span-2'>
                        <div className="flex items-center gap-5">
                            <div className='max-w-[200px] max-h-[200px]'>
                                <div>
                                    {photo ? (
                                        <Image className='w-full ' src={photo} width={200} height={200} alt="User profile photo" />
                                    ) : (
                                        <Image className='w-full ' src="/header/user (4).png" width={200} height={200} alt="Default profile photo" />
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* Numele medicului */}
                                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
                                    {name}
                                </h3>

                                {/* Rating-ul medicului */}
                                <div className='flex items-center gap-[6px] my-2'>
                                    <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                                        <Image src='/clinics/Star.png' alt='' width={20} height={20} /> {averageRating.toFixed(1)}
                                    </span>
                                    <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
                                        ({totalRating} reviews)
                                    </span>
                                </div>

                                {/* Specializarea */}
                                <div className="my-3">
                                    <span className='bg-[#CCF0F3] text-irisBlueColor mt-3 py-1 px-6 lg:py-2 lg:px:6 text-[12px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded'>
                                        {specialization}
                                    </span>
                                </div>

                                {/* Gradul medical */}
                                <div className='mt-5'>
                                    <span className='bg-[#fff9ea]   text-yellowColor py-1 px-6 lg:py-2 lg:px:6 text-[12px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded'>
                                        Medic {medicalGrade}
                                    </span>
                                </div>

                                {/* Bio, afișat sub toate celelalte informații */}
                                <p className='text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] mt-3'>
                                    {bio}
                                </p>
                            </div>
                        </div>
                        <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                            <button
                                onClick={() => setTab('despre')}
                                className={`  ${tab === 'despre' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                                Despre
                            </button>
                            <button
                                onClick={() => setTab('servicii')}
                                className={`  ${tab === 'servicii' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                                Servicii
                            </button>
                            <button
                                onClick={() => setTab('feedback')}
                                className={`  ${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                                Feedback
                            </button>


                        </div>
                        <div className='mt-[50px]'>
                            {
                                tab === 'despre' && <ClinicsAbout name={name} about={about} qualifications={qualifications} />
                            }
                            {
                                tab === 'servicii' && <Services doctorId={id} />
                            }
                            {
                                tab === 'feedback' && <Feedback reviews={reviews} totalRating={totalRating} />
                            }

                        </div>
                    </div>
                    <div>
                        <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} />
                    </div>
                </div>)}
            </div>
        </section>
    )
}

export default ClinicsDetails