"use client"
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { Fragment, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { BubblyLink } from "../bubbly/BubblyLink";
import { signOut, useSession } from 'next-auth/react';
const MyBubblyLink = ({ to = "", text = "", imageSrc = "" }) => (
    <BubblyLink
        to={to}
        colorStart="#175DDC"
        colorEnd="#2B2B2B"
        duration={1300}
    >
        {/* {imageSrc && <img src={imageSrc} alt="Icon" id="logo" />} */}
        {text}
    </BubblyLink>
);


const Header = () => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState(null);
    const menuRef = useRef(null);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseLeave = () => {
        // Adaugă un mic delay înainte de a închide meniul
        setTimeout(() => {
            if (!menuRef.current?.contains(document.activeElement)) {
                setAnchorEl(null);
            }
        }, 300); // 300 ms delay
    };
    return (
        <Popover className="flex items-center border-b-2 px-6 py-2 h-24 w-full" style={{ backgroundColor: '#FFFF', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> {/* Ajustează gap-ul după nevoie */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="/logo2-removebg-preview.png" alt="Logo" width={90} height={90} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="/smileSeek (2).png" alt="Smile" width={170} height={170} />
                </div>
            </div>



            <div className="grow">
                <div className="hidden sm:flex items-center justify-end gap-2 md:gap-8 pr-5">
                    <Button variant="contained" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'black', border: 1, borderColor: 'black' }}>
                        <a href="#mapSection" style={{ color: 'black', textDecoration: 'none', textAlign: 'right' }}>
                            Explorează cabinetele
                        </a>
                    </Button>
                    <Button variant="contained" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'black', border: 1, borderColor: 'black' }}>
                        <Link href="/business" >
                            <p style={{ textDecoration: 'none', color: 'inherit' }}>Alaturati-va ca profesionist</p>
                        </Link>
                    </Button>
                </div>

                <div className="flex grow items-center justify-end sm:hidden">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
          hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                </div>
            </div>
            <div className="hidden sm:flex justify-end gap-2 md:gap-8">
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onMouseEnter={handleMouseEnter}
                >
                    {session?.user && session?.user.image
                        ? <Image src={session?.user.image} alt="user" width={40} height={40} className='rounded-full' />
                        : <AccountCircleIcon style={{ fontSize: 40 }} />}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMouseLeave}
                    MenuListProps={{ onMouseLeave: handleMouseLeave }}
                >
                    {session?.user
                        ? <MenuItem onClick={handleMouseLeave}><button onClick={() => signOut()}>Sign Out</button></MenuItem>
                        : <MenuItem onClick={handleMouseLeave}><Link href="/login" style={{ color: 'black', textDecoration: 'none', textAlign: 'right' }}>
                            Login
                        </Link></MenuItem>}
                    {/* <MenuItem onClick={handleMouseLeave}><button onClick={() => signOut()}>Sign Out</button></MenuItem>
                    <MenuItem onClick={handleMouseLeave}>Opțiunea 2</MenuItem> */}
                </Menu>
            </div>

            <Popover.Overlay className="fixed inset-0 bg-white opacity-100" />
            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom='opacity-0 scale-95'
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden bg-white">
                    <div className="px-6 pt-5 pb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold" style={{ fontFamily: 'Newsreader, serif', color: 'black', fontSize: '20px' }}>SmileSeek</h1>
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <div className="mt-6">
                            <nav className="grid gap-y-8">
                                <Button
                                    variant="contained"
                                    sx={{
                                        boxShadow: 'none',
                                        '&:hover': { boxShadow: 'none' },
                                        color: 'black',
                                        justifyContent: 'flex-start' // Aliniază conținutul butonului la dreapta
                                    }}
                                >
                                    <a href="#mapSection" style={{ color: 'black', textDecoration: 'none', textAlign: 'right' }}>
                                        Explorează cabinetele
                                    </a>

                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        boxShadow: 'none',
                                        '&:hover': { boxShadow: 'none' },
                                        color: 'black',
                                        justifyContent: 'flex-start' // Aliniază conținutul butonului la dreapta
                                    }}
                                >
                                    <Link href="/home" style={{ color: 'black', textDecoration: 'none', textAlign: 'right' }}>
                                        Alaturati-va ca profesionist
                                    </Link>
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        boxShadow: 'none',
                                        '&:hover': { boxShadow: 'none' },
                                        color: 'black',
                                        justifyContent: 'flex-start' // Aliniază conținutul butonului la dreapta
                                    }}
                                >
                                    <AccountCircleIcon style={{ fontSize: 40 }} />
                                    <span style={{ marginLeft: '8px', color: 'black' }}>Cont</span>
                                </Button>
                            </nav>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default Header;
