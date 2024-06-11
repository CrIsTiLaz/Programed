'use client'
import React from 'react'
import Login from './Login'
import { signIn } from 'next-auth/react'

function page() {
    return (
        <section>


            <Login />
        </section>
    )
}

export default page


