'use client'
import { useContext, useRef, useState } from 'react'
import Image from 'next/image';
import { authContext } from '../../../context/AuthContext'
import MyBookings from './MyBookings';
import Profile from './Profile';
import useFetchData from '../../../hooks/useFetchData'
import { BASE_URL } from '@/app/config';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';
import dynamic from "next/dynamic";
import { BiMenu } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

function MyAccount() {

    const { dispatch } = useContext(authContext)
    const [tab, setTab] = useState('bookings')
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef();

    const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`)

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = (tabName) => {
        setTab(tabName);
        toggleMenu();
    };

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>

                {loading && !error && <Loading />}

                {error && !loading && <Error errMessage={error} />}

                {
                    !loading && !error &&
                    <div>
                        {/* Meniu pentru ecrane mici */}
                        {/* <header>
                            <nav ref={navRef} className={`lg:hidden ${menuOpen ? 'showNavbar' : ''}`}>
                                <button onClick={() => handleLinkClick('bookings')} className={`${tab === 'bookings' ? 'bg-primaryColor text-white' : 'bg-transparent text-headingColor'} w-full btn mt-5 rounded-md`}>
                                    Programările Mele
                                </button>
                                <button onClick={() => handleLinkClick('settings')} className={`${tab === 'settings' ? 'bg-primaryColor text-white' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}>
                                    Profil
                                </button>
                                <div className='mt-[100px] w-full'>
                                    <button onClick={() => { handleLogout(); toggleMenu(); }} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                                        Deconectare
                                    </button>
                                </div>
                                <button
                                    className="nav-btn nav-close-btn"
                                    onClick={showNavbar}>
                                    <FaTimes style={{ color: 'black' }} />
                                </button>
                            </nav>
                            <button
                                className="nav-btn"
                                onClick={showNavbar}>
                                <BiMenu style={{ color: 'black' }} />
                            </button>
                        </header> */}

                        {/* Meniul pentru ecrane mari */}
                        <div className=' md:grid md:grid-cols-3 gap-10'>
                            <div className="pb-[50px] px-[30px] rounded-md">
                                <div className="flex items-center justify-center">
                                    <div className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                                        {userData?.photo ? (
                                            <Image src={userData?.photo} alt="" width={50} height={50} className='w-full h-full rounded-full' />
                                        ) : (
                                            <Image className='w-full h-full rounded-full' src="/header/user64.png" width={50} height={50} alt="Default profile photo" />
                                        )}
                                    </div>
                                </div>

                                <div className='text-center mt-4'>
                                    <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                                        {userData.name}
                                    </h3>
                                    <p className='text-textColor text-[15px] leading-6 font-medium'>
                                        {userData.email}
                                    </p>
                                </div>

                                <div className='mt-[50px] md:mt-[100px] hidden md:block'>
                                    <button onClick={handleLogout} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                                        Deconectare
                                    </button>
                                </div>
                            </div>

                            <div className='md:col-span-2 md:px-[30px]'>
                                <div className="flex ">
                                    <button onClick={() => setTab('bookings')}
                                        className={`${tab === 'bookings' ? 'bg-primaryColor text-white' : 'text-headingColor'} flex-1 py-2 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                        Programările Mele
                                    </button>

                                    <button onClick={() => setTab('settings')}
                                        className={`${tab === 'settings' ? 'bg-primaryColor text-white' : 'text-headingColor'} flex-1 py-2 px-5 ml-5 rounded-md font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                        Profil
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
                    </div>
                }
            </div>
        </section>
    )
}

export default dynamic(() => Promise.resolve(MyAccount), { ssr: false })
