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
    return (
        <header className='header flex items-center sticky__header' ref={headerRef} >
            <div className='container'>
                <div className='flex items-center justify-between'>
                    <div>
                        <Image src="/header/logo-removebg-preview.png" alt="Logo" width={90} height={90} />
                    </div>

                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>

                        <ul className='menu flex items-center gap-[2.7rem]'>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/" legacyBehavior>
                                    <a className={` ${pathname === "/" ? "font-bold" : ""} text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor `}>
                                        Home
                                    </a>
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/clinics" legacyBehavior>
                                    <a className={` ${pathname === "/clinics" ? "font-bold" : ""} text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor `}>
                                        Cabinete
                                    </a>
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="/contact" legacyBehavior>
                                    <a className={` ${pathname === "/contact" ? "font-bold" : ""} text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor `}>
                                        Contact
                                    </a>
                                </Link>
                            </motion.div>
                        </ul>

                    </div>

                    <div className='flex items-center gap-4'>

                        {
                            token && user ? <div >
                                <Link href={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                                    <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                                        <Image src={user?.photo} className='w-full rounded-full' alt=""></Image>
                                    </figure>


                                </Link>
                            </div> : <div>
                                <Link href="/login">
                                    <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex item-center
                            justify-center rounded-[50px]'>Login</button>
                                </Link>
                                {/* </motion.div> */}
                            </div>
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