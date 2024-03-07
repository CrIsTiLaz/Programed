'use client'
import { useContext, useState } from 'react'
import Image from 'next/image';
import { authContext } from '../../../context/AuthContext'
import MyBookings from './MyBookings';
import Profile from './Profile';
import useFetchData from '../../../hooks/useFetchData'
import { BASE_URL } from '@/app/config';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';

function MyAccount() {

    const { dispatch } = useContext(authContext)
    const [tab, setTab] = useState('bookings')

    const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`)
    // console.log('loading', loading)
    // console.log('userData', userData)

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>

                {loading && !error && <Loading />}

                {error && !loading && <Error errMessage={error} />}

                {
                    !loading && !error &&
                    <div className='grid md:grid-cols-3 gap-10'>
                        <div className="pb-[50px] px-[30px] rounded-md">
                            <div className="flex items-center justify-center">
                                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                                    {/* <Image src="/hero/hero-img01.png" alt="" width={40} height={40} className='w-full h-full rounded-full' /> */}
                                    <Image src={userData.photo} alt="" width={50} height={50} className='w-full h-full rounded-full' />
                                </figure>
                            </div>

                            <div className='text-center mt-4'>
                                <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                                    {userData.name}
                                </h3>
                                <p className='text-textColor text-[15px] leading-6 font-medium'>
                                    {userData.email}
                                </p>
                                <p className='text-textColor text-[15px] leading-6 font-medium'>
                                    Blood Type: <span className='ml-2 text-headingColor text-[22px] leading-8'>
                                        {userData.bloodType}
                                    </span>
                                </p>
                            </div>

                            <div className='mt-[50px] md:mt-[100px]'>
                                <button onClick={handleLogout} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                                    Logout
                                </button>

                                <button className='btn w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                                    Delete account
                                </button>
                            </div>

                        </div>

                        <div className='md:col-span-2 md:px-[30px]'>
                            <div className="flex">
                                <button onClick={() => setTab('bookings')}
                                    className={`${tab === 'bookings' ? 'bg-primaryColor text-white' : 'text-headingColor'} flex-1 py-2 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                    My Bookings
                                </button>

                                <button onClick={() => setTab('settings')}
                                    className={`${tab === 'settings' ? 'bg-primaryColor text-white' : 'text-headingColor'} flex-1 py-2 px-5 ml-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                    Profile Settings
                                </button>
                            </div>

                            {
                                tab === 'bookings' && <MyBookings />
                            }

                            {
                                tab === 'settings' && <Profile user={userData} />
                            }

                        </div>
                    </div>
                }
            </div>
        </section>
    )
}
// D:\learn\nextJS\qb\query-builder-beta\public\hero\hero-img01.png
export default MyAccount