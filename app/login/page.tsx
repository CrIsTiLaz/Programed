'use client'
import React from 'react'
import Login from './Login'
import { signIn } from 'next-auth/react'

function page() {
    return (
        <section>
            <button type="button" onClick={() => signIn()} style={{
                backgroundColor: '#175DDC', // Culoarea specifică Google
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
            }}>
                Sign Up with Google
            </button>

            <Login />
        </section>
    )
}

export default page


