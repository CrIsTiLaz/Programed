import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineYoutube, AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai';

const socialLinks = [
    {
        path: "https://www.youtube.com/",
        icon: <AiOutlineYoutube className='group-hover:text-white w-4 h-5' />
    },
    {
        path: "https://www.facebook.com",
        icon: <AiFillFacebook className='group-hover:text-white w-4 h-5' />

    },
    {
        path: "https://www.instagram.com/",
        icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />
    }
]

const quickLinks01 = [
    {
        path: "/home",
        display: "Home"
    },
    {
        path: "/",
        display: "About Us"
    },
    {
        path: "/services",
        display: "Services"
    },
    {
        path: "/",
        display: "Blog"
    },
]

const quickLinks02 = [
    {
        path: "/find-a-doctor",
        display: "Find a doctor"
    },
    {
        path: "/",
        display: "Request an appointment"
    },
    {
        path: "/",
        display: "Find a location"
    },
    {
        path: "/",
        display: "Get a opinion"
    },
]

const quickLinks03 = [
    {
        path: "/contact",
        display: "Contact us"
    }
]


function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className='pb-16 pt-10'>
            <div className="container">
                <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
                    <div>
                        <Image src="/logo2-removebg-preview.png" alt="Logo" width={90} height={90} />
                        <p className='text-[16px] leading-7 font-[400] text-textColor mt-4'>Copyright © {year} SmileSeek. Toate drepturile rezervate</p>
                        <div className='flex items-center gap-3 mt-4'>
                            {socialLinks.map((link, index) =>
                                <motion.div key={index} whileHover={{ scale: 1.3, fontWeight: "bold" }}>
                                    <Link href={link.path} key={index}
                                        className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                                        {link.icon}
                                    </Link>
                                </motion.div>)}
                        </div>
                    </div>

                    <div>
                        <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
                            Linkuri rapide
                        </h2>

                        <ul>
                            {quickLinks01.map((link, index) =>
                                <motion.div key={index} whileHover={{ scale: 1.1 }}>
                                    <li key={index} className='mb-4'>
                                        <Link href={link.path} className='text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor'>
                                            {link.display}
                                        </Link>
                                    </li>
                                </motion.div>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
                            Vreau sa:
                        </h2>

                        <ul>
                            {quickLinks02.map((link, index) =>
                                <motion.div key={index} whileHover={{ scale: 1.1 }}>
                                    <li key={index} className='mb-4'>
                                        <Link href={link.path} className='text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor'>
                                            {link.display}
                                        </Link>
                                    </li>
                                </motion.div>)}
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
                            Suport
                        </h2>

                        <ul>
                            {quickLinks03.map((link, index) =>
                                <motion.div key={index} whileHover={{ scale: 1.1 }}>
                                    <li key={index} className='mb-4'>
                                        <Link href={link.path} className='text-[16px] leading-7 font-[400] text-textColor hover:text-primaryColor'>
                                            {link.display}
                                        </Link>
                                    </li>
                                </motion.div>)}
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;

{/* <h1 style={{ fontWeight: 'bold', marginTop: '0', fontSize: '25px' }}>SmileSeek</h1> */ }