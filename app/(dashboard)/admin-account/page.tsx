import Link from 'next/link'
import React from 'react'
import AdminDashboard from './AdminDashboard'
import ProtectedRoute from '@/app/utils/ProtectedRoute'

function page() {
    return (
        <ProtectedRoute allowedRoles={['superAdmin']}>
            <div>
                <AdminDashboard />
                {/* <p className='mt-5 text-textColor text-center'>
                Nu ai cont? <Link href="/doctor-register" className='text-primaryColor font-medium ml-1'>Inregistrare</Link>
            </p> */}
            </div>
        </ProtectedRoute>
    )
}

export default page