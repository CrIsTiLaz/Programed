'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from "../../config";
import HashLoader from 'react-spinners/ClockLoader';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Image from 'next/image';

function Signup() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: 'Timișoara',
        phone: '', // Added phone field
        email: '',
        password: '',
        role: 'cabinet', // Default role set to 'cabinet'
    });

    const router = useRouter();

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/auth/clinic-register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Eroare la înregistrare');
            }

            Swal.fire({
                title: 'Succes!',
                text: data.message || 'Te-ai înregistrat cu succes!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setLoading(false);
            router.push('/login');
        } catch (err) {
            Swal.fire({
                title: 'Eroare!',
                text: err.message || 'Înregistrarea a eșuat!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setLoading(false);
        }
    };

    return (
        <section className='px-5 xl:px-0'>
            <div className='max-w-[1170px] mx-auto'>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className='hidden lg:block rounded-l-lg'>
                        <figure className='w-full h-full flex justify-center items-center'>
                            <Image width={0}
                                height={0} src='/clinics/Health professional team.gif' alt='Signup illustration' className='object-cover w-[450px] h-[450px]' />
                        </figure>
                        <a href="https://storyset.com/team">Team illustrations by Storyset</a>
                    </div>
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                            Creează un <span className='text-primaryColor'>cont</span>
                        </h3>

                        <form onSubmit={submitHandler}>
                            <div className='mb-5'>
                                <input
                                    type='text'
                                    placeholder='Numele complet'
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <input
                                    type='text'
                                    placeholder='Adresă'
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor cursor-pointer'
                                    required
                                >
                                    <option value="Timișoara">Timișoara</option>
                                </select>
                            </div>
                            <div className='mb-5'>
                                <input
                                    type='text'
                                    placeholder='Număr de telefon'
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <input
                                    type='password'
                                    placeholder='Parola'
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mt-7'>
                                <button disabled={loading} type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                                    {loading ? <HashLoader size={35} color='#ffffff' /> : 'Înregistrează-te'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Signup;
