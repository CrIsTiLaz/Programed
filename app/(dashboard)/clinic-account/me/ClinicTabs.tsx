import React, { useContext, useRef, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from "react-icons/fa";

function ClinicTabs({ tab, setTab }) {
    const menuRef = useRef();
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

    const showNavbar = () => {
        menuRef.current.classList.toggle("responsive_nav");
    };

    return (
        <div>
            {/* Meniu pentru ecrane mici */}
            <header>
                <nav ref={menuRef} className={`lg:hidden ${menuOpen ? 'showNavbar' : ''}`}>
                    <button onClick={() => handleLinkClick('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-5 rounded-md`}>
                        Prezentare generală
                    </button>

                    <button onClick={() => handleLinkClick('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                        Profil
                    </button>

                    <div className='mt-[100px] w-full'>
                        <button onClick={() => { handleLogout(); toggleMenu(); }} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                            Deconectare
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

            {/* Meniul pentru ecrane mari */}
            <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                    Prezentare generală
                </button>

                <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>
                    Profil
                </button>

                <div className='mt-[100px] w-full'>
                    <button onClick={handleLogout} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                        Deconectare
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClinicTabs;
