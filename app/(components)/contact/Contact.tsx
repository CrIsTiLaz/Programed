'use client'
import { BASE_URL } from '@/app/config';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

function Contact() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pregătește datele pentru trimitere
        const formData = {
            email,
            subject,
            message
        };

        try {
            // Trimite cererea către backend
            const response = await fetch(`${BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verifică dacă cererea a avut succes
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Mesaj trimis!',
                    text: 'Mesajul a fost trimis cu succes.',
                }).then(() => {
                    router.push('/');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Eroare',
                    text: 'A apărut o eroare la trimiterea mesajului.',
                });
            }
        } catch (error) {
            console.error('Eroare la trimiterea formularului:', error);
            Swal.fire({
                icon: 'error',
                title: 'Eroare',
                text: 'A apărut o eroare la trimiterea mesajului.',
            });
        }
    }

    return (
        <section>
            <div className='px-4 mx-auto max-w-screen-md'>
                <h2 className='heading text-center'>
                    Contactați-ne
                </h2>

                <p className='mb-8 lg:mb-16 font-light text-center text__para'>
                    Aveți o problemă tehnică? Doriți să trimiteți feedback despre o funcție beta?
                </p>

                <form onSubmit={handleSubmit} className='space-y-8'>
                    <div>
                        <label htmlFor="email" className='form__label'>
                            Email-ul dvs.
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='exemplu@gmail.com'
                            className='form__input mt-1'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className='form__label'>
                            Subiect
                        </label>
                        <input
                            type='text'
                            id='subject'
                            placeholder='Spuneți-ne cum vă putem ajuta'
                            className='form__input mt-1'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className='sm:col-span-2'>
                        <label htmlFor="message" className='form__label'>
                            Mesajul dvs.
                        </label>
                        <textarea
                            rows='6'
                            type='text'
                            id='message'
                            placeholder='Lăsați un comentariu..'
                            className='form__input mt-1'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn sm:w-fit'>
                        Trimite
                    </button>

                </form>
            </div>
        </section>
    )
}

export default Contact;
