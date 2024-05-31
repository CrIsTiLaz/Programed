import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Example from '@/app/utils/Calendar';
import Time from './Time';
import { BASE_URL, token } from '@/app/config';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { motion } from "framer-motion";

export default function SidePanel({ doctorId, ticketPrice }) {
    const router = useRouter();
    const [tab, setTab] = useState('date');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [currentToken, setCurrentToken] = useState('');

    useEffect(() => {
        // Set current token from config or 'z' if token is empty
        // console.log('token', token)
        // if (token === 'null') {
        //     setCurrentToken('z');
        //     console.log('ifff')
        // }
        // else {
        //     setCurrentToken(token || 'z');
        //     console.log('elseeeeee')
        // }
        setCurrentToken(token);
        console.log('Token set in useEffect:', token);
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setTab('time');
        setSelectedHour(null);
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };

    const bookingHandler = async () => {
        try {
            const formattedDate = selectedDate.toISOString();
            let requestUrl, bookingData;
            console.log('currentToken in bookingHandler:', currentToken);
            console.log('currentToken', currentToken)
            // if (currentToken && currentToken !== 'z') {
            //     console.log('if')
            //     requestUrl = `${BASE_URL}/bookings/checkout-session/${doctorId}`;
            //     bookingData = {
            //         appointmentDate: formattedDate,
            //         appointmentTime: selectedHour,
            //     };


            if (currentToken === 'null') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email || !emailPattern.test(email)) {
                    throw new Error('Emailul nu este valid.');

                }
                console.log('else if (token is z)')
                requestUrl = `${BASE_URL}/bookings/checkout-sessionWithEmail/${doctorId}`;
                bookingData = {
                    appointmentDate: formattedDate,
                    appointmentTime: selectedHour,
                    email,
                    name
                };





            } else {
                console.log('if')
                requestUrl = `${BASE_URL}/bookings/checkout-session/${doctorId}`;
                bookingData = {
                    appointmentDate: formattedDate,
                    appointmentTime: selectedHour,
                };
            }
            const res = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Authorization: currentToken ? `Bearer ${currentToken}` : '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'There was an error processing your request.');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Your booking is confirmed!',
                text: 'Thank you! Your booking has been successfully made.',
                willClose: () => {
                    router.push('/bookings');
                }
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.toString(),
            });
        }
    };


    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
            <div className="flex items-center justify-between">
                <p className='text__para mt-0 font-semibold'>Pret consultatie</p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                    {ticketPrice} lei
                </span>
            </div>


            {tab !== 'date' && (
                <div className="mt-[50px]">
                    <button onClick={() => setTab('date')} className="py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <AiOutlineArrowLeft className="inline-block mr-2" /> Back
                        </motion.div>
                    </button>
                </div>
            )}

            <div className={`mt-[50px]`}>
                {tab === 'date' && <Example onDateSelect={handleDateSelect} doctorId={doctorId} />}
                {tab === 'time' && <Time onHourSelect={handleHourSelect} selectedDate={selectedDate} doctorId={doctorId} />}
            </div>

            {selectedDate && selectedHour && (
                currentToken === 'null' && tab === 'time' ? (
                    <div>
                        <div className='mt-[30px] gap-5'>
                            <input
                                type="email"
                                placeholder="Introduceți emailul"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form__input"
                            />
                        </div>
                        <div className='mt-[15px] gap-5'>
                            <input
                                type="text"
                                placeholder="Introduceți numele complet"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form__input "
                            />
                        </div>
                        {email && name && (
                            <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                                Fa programare
                            </button>

                        )}

                    </div>


                ) : (
                    tab === 'time' &&
                    <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                        Fa programare
                    </button>
                )
            )}
        </div>
    );
}
//cristilazea18@gmail.com