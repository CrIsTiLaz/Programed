import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'
import ClinicDashboard from './ClinicDashboard'

function page() {
    return (
        <ProtectedRoute allowedRoles={['cabinet']}>
            <div>
                <ClinicDashboard />
            </div>
        </ProtectedRoute>

    )
}

export default page