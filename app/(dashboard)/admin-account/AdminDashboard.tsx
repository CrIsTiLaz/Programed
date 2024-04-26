'use client'

import { authContext } from '@/app/context/AuthContext'
import Link from 'next/link'
import React, { useContext } from 'react'

function AdminDashboard() {
    const { dispatch } = useContext(authContext)

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }
    return (
        <div className='max-w-[1170px] px-5 mx-auto'>
            <div className='grid md:grid-cols-3 gap-10'>
                <div className="pb-[50px] px-[30px] rounded-md">
                    <div className='mt-[50px] md:mt-[100px]'>
                        <button onClick={handleLogout} className='btn w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                            Logout
                        </button>

                        <button className='btn w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                            Delete account
                        </button>

                        <button className='btn w-full  text-center text-[16px] leading-7 rounded-md'>
                            <Link href="/doctor-register" > Creeaza medic </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard