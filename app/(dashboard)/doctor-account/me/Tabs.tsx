import React, { useContext, useRef, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaTimes } from "react-icons/fa";

function Tabs({ tab, setTab }) {

    const { dispatch } = useContext(authContext);
    const navigate = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate.push('/');
    };
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = (tabName) => {
        setTab(tabName);
        toggleMenu();
    };

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <div>
            <header >
                {/* Mobile Navigation */}
                {/* <nav ref={navRef} className='lg:hidden'>
                    <button onClick={() => handleLinkClick('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-5 rounded-md`}>
                        Overview
                    </button>
                    <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                        Appointments
                    </button>

                    <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                        Profile
                    </button>
                    <div className='mt-[100px] w-full'>
                        <button onClick={handleLogout} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                            Logout
                        </button>

                        <button className='btn w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                            Delete account
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
                </button> */}

                <nav ref={navRef} className={`lg:hidden  ${menuOpen ? 'showNavbar' : ''}`}>
                    <button onClick={() => handleLinkClick('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-5 rounded-md`}>
                        Overview
                    </button>
                    <button onClick={() => handleLinkClick('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                        Appointments
                    </button>
                    <button onClick={() => handleLinkClick('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                        Profile
                    </button>
                    <div className='mt-[100px] w-full'>
                        <button onClick={() => { handleLogout(); toggleMenu(); }} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                            Logout
                        </button>
                        <button onClick={toggleMenu} className='btn w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                            Delete account
                        </button>
                    </div>
                    <button
                        className="nav-btn nav-close-btn "
                        onClick={showNavbar}>
                        <FaTimes style={{ color: 'black' }} />
                    </button>
                </nav>
                <button
                    className="nav-btn"
                    onClick={showNavbar}>
                    <BiMenu style={{ color: 'black' }} />
                </button>

            </header>
            <div className={`hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md`}>
                {/* Desktop Navigation */}
                <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                    Overview
                </button>

                <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                    Appointments
                </button>

                <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                    Profile
                </button>

                <div className='mt-[100px] w-full'>
                    <button onClick={handleLogout} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                        Logout
                    </button>

                    <button className='btn w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tabs;
