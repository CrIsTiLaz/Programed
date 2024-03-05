'use client'
import React, { useContext, useEffect } from 'react'
import { authContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation';
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles }) => {

    const router = useRouter();
    const { token, role } = useContext(authContext);

    const isAllowed = allowedRoles.includes(role);

    useEffect(() => {
        // Dacă utilizatorul nu este autentificat sau nu are rolul permis, redirecționează-l către pagina de login
        if (!token || !isAllowed) {
            router.push('/login');
        }
    }, [token, isAllowed, router]);

    // Dacă utilizatorul este autentificat și are rolul permis, afișează componenta copil
    return token && isAllowed ? children : null;
};

// const accessibleRoute = token && isAllowed ? children : router.push('/login');
// const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true} />
// return accessibleRoute

export default ProtectedRoute