"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { GoogleLogin } from 'react-google-login';
import Form from './form';
import { Box, Button, Grid, Link } from '@mui/material';

function Login() {
    const { data: session } = useSession();
    const router = useRouter();
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const handleLoginSuccess = () => {
        signIn();
        // Procesează răspunsul Google aici
    };

    const handleLoginFailure = (response) => {
        console.error('Autentificare eșuată:', response);
        // Gestionează eșecul autentificării aici
    };

    useEffect(() => {
        //console.log("session ", session)
        if (session?.user) {
            router.push("/")
        }
    }, [session])

    return (
        <div className='flex flex-col justify-center items-center mt-[10%] gap-10'>
            <Form />
            {/* <Image src='/logo2-removebg-preview.png'
                alt='logo'
                width={300}
                height={300}
            /> */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
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
                <Grid container justifyContent="space-between" style={{ width: '100%' }}> {/* Asigură-te că Grid-ul are lățimea completă */}
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <div style={{ flexGrow: 1 }}></div> {/* Spacer element */}
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default Login