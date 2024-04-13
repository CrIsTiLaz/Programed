import React, { useContext, useRef } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation'; // Corectat la 'next/router'

function ClinicTabs({ tab, setTab }) {
    const menuRef = useRef();
    const { dispatch } = useContext(authContext);
    const navigate = useRouter();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate.push('/');
    };

    const toggleMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.toggle('show__menu');
        }
    };

    return (
        <div>
            {/* Trigger pentru meniu */}
            <div className='lg:hidden' onClick={toggleMenu}>
                <BiMenu className='w-6 h-6 cursor-pointer' />
            </div>

            {/* Meniul, cu clasa `navigation` adăugată */}
            <div ref={menuRef} className='navigation hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                {/* Butoanele meniului */}
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

export default ClinicTabs;
