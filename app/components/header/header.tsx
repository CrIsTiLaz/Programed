import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import Link from "next/link";
import { Fragment } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <Popover className="flex items-center border-b-2 px-6 py-2 h-24 w-full" style={{ backgroundColor: '#4A90E2', position: 'sticky', top: 0, zIndex: 1000 }}>
            <h1 className="font-bold" style={{ fontFamily: 'Newsreader, serif', color: 'white', fontSize: '37px' }}>SmileSeek</h1>

            <div className="grow">
                <div className="hidden sm:flex items-center justify-end gap-2 md:gap-8 pr-5">
                    <Button variant="contained" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'black', border: 1, borderColor: 'black' }}>
                        <Link href="/home" style={{ color: 'black', textDecoration: 'none' }}>Exploreaza cabinetele</Link>
                    </Button>
                    <Button variant="contained" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, color: 'white', border: 1, borderColor: 'black' }}>
                        <Link href="/blog">Alaturati-va ca profesionist</Link>
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
                <Link href="/blog">
                    <  AccountCircleIcon style={{ fontSize: 40 }} />
                </Link>
            </div>

            <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom='opacity-0 scale-95'
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="px-6 pt-5 pb-6 pr-4">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold">SmileSeek</h1>
                            <div className="-mr-2">
                                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 
                text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset
                focus:ring-indigo-500">
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="mt-6 pr-4">
                            <nav className="grid gap-y-8">
                                <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2">
                                    Exploreaza cabinetele
                                </Link>
                                <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2">
                                    Alaturati-va ca profesionist
                                </Link>
                                <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2">
                                    Home
                                </Link>
                            </nav>
                        </div>
                        <div className="mt-6 flex flex-col items-end gap-2">
                            <Link href="/register" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-x1 w-full border-2
              focus:outline-none focus:ring-inset focus:ring-gray-500">
                                Cont
                            </Link>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default Header;
