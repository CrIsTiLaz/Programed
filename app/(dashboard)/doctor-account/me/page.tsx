import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'

function page() {
    return (
        <ProtectedRoute allowedRoles={['doctor']}>
            <div>page</div>
        </ProtectedRoute>
    )
}

export default page

//50