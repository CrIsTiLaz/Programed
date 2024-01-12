"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

function Login() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        //console.log("session ", session)
        if (session?.user) {
            router.push("/")
        }
    }, [session])

    return (
        <div className='flex flex-col justify-center items-center mt-[10%] gap-10'>
            <Image src='/logo2-removebg-preview.png'
                alt='logo'
                width={300}
                height={300}
            />
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


        </div>
    )
}

export default Login