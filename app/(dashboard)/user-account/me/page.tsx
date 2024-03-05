import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'
import MyAccount from './MyAccount'

function page() {
    return (
        <ProtectedRoute allowedRoles={['patient']}>
            <div>
                <MyAccount />
            </div>
        </ProtectedRoute>
    )
}

export default page