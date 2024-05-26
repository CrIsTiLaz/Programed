import React, { useEffect, useRef, useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BiMenu } from 'react-icons/bi';
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"
import { authContext } from "../../context/AuthContext"
import dynamic from "next/dynamic";
import useFetchData from '@/app/hooks/useFetchData';
import { BASE_URL } from '@/app/config';
function Header() {
    const { data: session } = useSession();
    const headerRef = useRef(null)
    const menuRef = useRef()
    const router = useRouter();
    const pathname = usePathname();
    const { data: userData } = useFetchData(`${BASE_URL}/users/profile/me`)
    const { user, role, token } = useContext(authContext)
    const navigateToProfile = () => {
        const profilePath = role === 'doctor' ? '/doctor-account/me' : '/user-account/me';
        router.push(profilePath); // Folosește router.push pentru a naviga
    };
    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
    return (
        <header className='header flex items-center sticky__header' ref={headerRef} >
            <div className='container'>
                <div className='flex items-center justify-between'>
                    <Image src="/header/logo-removebg-preview.png" alt="Logo" width={90} height={90} />
                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                        <div className='menu flex items-center gap-[2.7rem]'>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/" className={` ${pathname === "/" ? "font-bold" : ""} text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor `}>
                                    Home
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/clinics" className={` ${pathname === "/clinics" ? "font-bold" : ""} text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor `}>
                                    Cabinete
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/contact" className={` ${pathname === "/contact" ? "font-bold" : ""} text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor `}>
                                    Contact
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    <div className='flex items-center gap-4'>
                        {

                            token && user ? (
                                <div className={`${pathname === "/doctor-account/me" ? "border-2 border-black" : ""} w-[35px] h-[35px] rounded-full cursor-pointer`} onClick={navigateToProfile}>
                                    {/* <Image className='w-full rounded-full' src={user?.photo} width={40} height={40} alt="User profile photo" /> */}

                                    {user.photo ? (
                                        <Image className='w-full rounded-full' src={user.photo} width={40} height={40} alt="User profile photo" />
                                    ) : (
                                        <Image className='w-full rounded-full' src="/header/user64.png" width={40} height={40} alt="Default profile photo" />
                                    )}
                                </div>

                            ) : (
                                <Link href="/login" className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                                    Login
                                </Link>
                            )
                        }

                        {/* <motion.div whileHover={{ scale: 1.1 }}> */}
                        <div className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default dynamic(() => Promise.resolve(Header), { ssr: false })