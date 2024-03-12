import React, { useState } from 'react'
import Loading from '@/app/loading'
import Error from '../../../error/Error'
// import { useGetProfile } from '../../../hooks/useFetchData'
import useGetProfile from "../../../hooks/useFetchData"
import { BASE_URL } from '@/app/config'
import Tabs from './Tabs'
import Image from 'next/image';
import ClinicsAbout from '@/app/(components)/clinics/ClinicsAbout'
import Profile from './Profile'

function Dashboard() {

    const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`)

    const [tab, setTab] = useState('overview')

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={"errrrrrrrrrrr"} />}

                {
                    !loading && !error && <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
                        <Tabs tab={tab} setTab={setTab} />
                        <div className="lg:col-span-2">
                            {data.isApproved === 'pending' && (
                                <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                                    <svg
                                        aria-hidden="true"
                                        className="flex-shrink-0 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 100-2zM9 14a1 1 0 100 2 1 1 0 000-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    <span className='sr-only'>
                                        Info
                                    </span>

                                    <div className='ml-3 text-sm fonst-medium'>
                                        To get approval please complete your profile.We ll review manually and approve within 3 days                                    </div>

                                </div>
                            )}

                            <div className='mt-8'>
                                {tab === 'overview' && (
                                    <div>
                                        <div className='flex items-center gap-4 mb-10'>
                                            <figure className='max-w-[200px] max-h-[200px]'>
                                                <Image src={data?.photo} alt="" width={200} height={200} className='w-full ' />
                                            </figure>

                                            <div>
                                                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded 
                                                text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                                                    {/* {data.specialization}  */}
                                                    Surgeon
                                                </span>

                                                <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>
                                                    Muhibut ramanad
                                                </h3>

                                                <div className='flex item-center gap-[6px]'>
                                                    <span className='flex items-center gap-[6px] text-headingColor text-[14px] 
                                                    leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                                        <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                                                        4.5
                                                    </span>

                                                    <span className='text-textColor text-[14px] 
                                                    leading-5 lg:text-[16px] lg:leading-6 font-semibold'>

                                                        (233)
                                                    </span>
                                                </div>

                                                <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>
                                                    doctor bio
                                                </p>
                                            </div>
                                        </div>
                                        <ClinicsAbout
                                            name={data.name}
                                            about={data.about}
                                            qualifications={data.qualifications}
                                            experience={data.experience} />
                                    </div>)}
                                {tab === 'appointments' && <div>appointments</div>}
                                {tab === 'settings' && <Profile />}
                            </div>
                        </div>

                    </div>
                }
            </div>
        </section>
    )
}
//22
export default Dashboard
//credentials for medic
// User name: Cristi Doctor
// password: 1234
// email: doctor@gmail.com