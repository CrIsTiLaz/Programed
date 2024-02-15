"use client"
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

function page() {
    return (
        <div>page

            <button className='btn' onClick={() => signOut()}>Sign Out</button>
        </div>
    )
}

export default page