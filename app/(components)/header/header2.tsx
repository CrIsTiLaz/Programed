import React, { useEffect, useRef, useContext } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiMenu } from 'react-icons/bi';
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"
import { authContext } from "../../context/AuthContext"
import styles from "../../page.module.css"

function Header() {
    const { data: session } = useSession();
    const headerRef = useRef(null)
    const menuRef = useRef()
    const router = useRouter();
    const pathname = usePathname();

    const { user, role, token } = useContext(authContext)
    // console.log({ user, role, token }); // Log pentru authContext

    const navigateToProfile = () => {
        const profilePath = role === 'doctor' ? '/doctors/profile/me' : '/user-account/me';
        router.push(profilePath); // Folosește router.push pentru a naviga
    };

    // const handleStickyHeader = () => {
    //     window.addEventListener('scroll', () => {
    //         if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //             headerRef.current.classList.add("sticky__header")
    //         } else {
    //             headerRef.current.classList.remove("sticky__header")
    //         }
    //     })
    // }
    // useEffect(() => {
    //     handleStickyHeader()
    //     return () => window.removeEventListener('scroll', handleStickyHeader)
    // })
    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
    // console.log(user?.photo || '/undraw_pic_profile_re_7g2h.svg'); // Log pentru calea către foto
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
                            token && user && user.photo ? (
                                <div className='w-[35px] h-[35px] rounded-full cursor-pointer' onClick={navigateToProfile}>
                                    <Image src={user.photo || '/testimonial/undraw_pic_profile_re_7g2h.svg'} width={35} height={35} className='w-full rounded-full' alt="User profile photo" />
                                </div>
                            ) : (
                                <Link href="/login" className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                                    Login
                                </Link>
                            )
                        }



                        {/* <motion.div whileHover={{ scale: 1.1 }}> */}




                        <span className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>

            </div>

        </header>
    )
}

export default Header