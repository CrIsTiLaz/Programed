import Link from 'next/link';
import React, { useState, useContext } from 'react'
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../config';
import Swal from 'sweetalert2';
import { authContext } from "../context/AuthContext"
import HashLoader from 'react-spinners/HashLoader'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { dispatch } = useContext(authContext)

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'post',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'Eroare la înregistrare');
            }

            // Dacă înregistrarea este un succes, afișează un Sweet Alert de succes
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: result.data,
                    token: result.token,
                    role: result.role
                },
            });

            console.log('login result', result)
            setLoading(false);
            router.push('/');
        } catch (err) {
            // Dacă înregistrarea eșuează, afișează un Sweet Alert de eșec
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Înregistrarea a eșuat!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setLoading(false);
        }
    };

    return (
        <section className='px-5 lg:px-0'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                    Hello <span className='text-primaryColor'>Welcome</span>Back
                </h3>

                <form className='py-4 md:py-0' onSubmit={submitHandler}>
                    <div className='mb-5'>
                        <input
                            type='email'
                            placeholder='Introdu email'
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer'
                        />
                    </div>

                    <div className='mb-5'>
                        <input
                            type='password'
                            placeholder='Parola'
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className='w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer'
                        />
                    </div>
                    <div className='mt-7'>
                        <button type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                            {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}
                        </button>
                    </div>
                    <p className='mt-5 text-textColor text-center'>
                        Nu ai cont? <Link href="/register" className='text-primaryColor font-medium ml-1'>Inregistrare</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Login

//----------------------credentials-----------------------------------
//user name: Cristi Lazea
//email: cristilazea18@gmail.com
//password:1234
//pacient, barbat


//home/users/profile/me