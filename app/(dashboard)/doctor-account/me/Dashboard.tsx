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
import Appointments from './Appointments'
import DoctorsAbout from '@/app/(components)/doctors/DoctorsAbout'

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


                            <div className='mt-8'>
                                {tab === 'overview' && (
                                    <div>
                                        <div className='flex items-center gap-4 mb-10'>
                                            <figure className='max-w-[200px] max-h-[200px]'>
                                                {/* <Image src={data?.photo} alt="" width={200} height={200} className='w-full ' /> */}
                                                {data?.photo ? <Image src={data?.photo} alt="" width={200} height={200} /> : null}
                                            </figure>

                                            <div>
                                                <h3 className='text-[22px] leading-9 font-bold text-headingColor'>
                                                    {data.name}
                                                </h3>

                                                <div className='flex item-center gap-[6px] my-3'>
                                                    <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                                        <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                                                        {data.averageRating?.toFixed(1)}
                                                    </span>

                                                    <span className='text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                                        ({data.totalRating})
                                                    </span>
                                                </div>

                                                <div>
                                                    <div className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                                                        {data.specialization}
                                                    </div>
                                                    <div className='bg-[#fff9ea] text-yellowColor py-1 px-4 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold rounded mt-2'>
                                                        Medic {data.medicalGrade}
                                                    </div>
                                                </div>

                                                <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>
                                                    {data?.bio}
                                                </p>
                                            </div>

                                        </div>
                                        <DoctorsAbout
                                            name={data.name}
                                            about={data.about}
                                            qualifications={data.qualifications}
                                        />
                                    </div>)}
                                {tab === 'appointments' && <Appointments appointments={data.appointments} doctorId={data._id} />}
                                {tab === 'settings' && <Profile doctorData={data} />}
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