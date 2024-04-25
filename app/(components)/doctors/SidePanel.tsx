import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Presupunând că aceasta este calea corectă pentru useRouter în proiectul tău
import Example from '@/app/utils/Calendar';
import Time from './Time';
import { BASE_URL, token } from '@/app/config';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { motion } from "framer-motion";

export default function SidePanel({ doctorId, ticketPrice }) {
    const router = useRouter();
    const [tab, setTab] = useState('date');
    const [selectedDate, setSelectedDate] = useState(null); // State pentru data selectată
    const [selectedHour, setSelectedHour] = useState(null);

    // console.log('doctorId', doctorId)

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setTab('time');
        // Reset selected hour when a new date is selected
        setSelectedHour(null);
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        console.log(`Data selectată: ${selectedDate}, Ora selectată: ${hour}:00`);
    };

    // Presupunând că bookingHandler este necesar și este folosit în altă parte a componentei tale
    const bookingHandler = async () => {
        try {
            // Asigură-te că datele sunt în formatul acceptat de backend
            const formattedDate = selectedDate.toISOString(); // Formatăm data ca string ISO dacă este necesar
            const bookingData = {
                appointmentDate: formattedDate, // Data programării în format ISO string
                appointmentTime: selectedHour, // Ora programării ca string
                // Adaugă alte câmpuri necesare conform schemei backend-ului
            };

            // Construiește URL-ul și loghează-l pentru verificare
            const requestUrl = `${BASE_URL}/bookings/checkout-session/${doctorId}`;
            // console.log(`Making a POST request to: ${requestUrl}`);

            const res = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Token-ul de autorizare
                    'Content-Type': 'application/json', // Specificăm că trimitem date în format JSON
                },
                body: JSON.stringify(bookingData) // Convertim obiectul de date într-un string JSON
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'There was an error processing your request.');
            }

            // Dacă rezervarea este confirmată cu succes, afișăm o alertă și redirecționăm utilizatorul
            await Swal.fire({
                icon: 'success',
                title: 'Your booking is confirmed!',
                text: 'Thank you! Your booking has been successfully made.',
                willClose: () => {
                    router.push('/bookings');
                }
            });

        } catch (error) {
            // În caz de eroare, afișăm o alertă cu detaliile erorii
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

                    <button onClick={() => setTab('date')} className="  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold">
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
            {/* Afisează butonul doar dacă o dată și o oră sunt selectate */}
            {selectedDate && selectedHour && (
                <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                    Fa programare
                </button>
            )}
        </div>

    );

}



{/* <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                Fa programare
            </button> */}