import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Link from "next/link";
import { Fragment } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { BubblyLink } from "../bubbly/BubblyLink";

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
                        <Link href="/home" style={{ color: 'black', textDecoration: 'none' }}>Exploreaza cabinetele</Link>
                    </Button>
                    <Button variant="contained" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'black', border: 1, borderColor: 'black' }}>
                        <Link href="/blog">Alaturati-va ca profesionist</Link>
                        {/* <MyBubblyLink to="/">Alaturati-va ca profesionist</MyBubblyLink> */}
                        {/* <MyBubblyLink to="/test" text="a" /> */}
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
                <Link href="/login">
                    <  AccountCircleIcon style={{ fontSize: 40 }} />
                </Link>
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
                                    <Link href="/home" style={{ color: 'black', textDecoration: 'none', textAlign: 'right' }}>
                                        Exploreaza cabinetele
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
