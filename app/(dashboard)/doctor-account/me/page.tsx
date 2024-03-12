'use client'
import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'
import Dashboard from './Dashboard'

function page() {
    return (
        <ProtectedRoute allowedRoles={['doctor']}>
            <div>
                <Dashboard />
            </div>
        </ProtectedRoute>
    )
}

export default page

//50