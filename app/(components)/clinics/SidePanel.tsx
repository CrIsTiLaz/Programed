import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; // Presupunând că aceasta este calea corectă pentru useRouter în proiectul tău
import Example from '@/app/utils/Calendar';
import Time from './Time';

export default function SidePanel({ doctorId, ticketPrice }) {
    const router = useRouter();
    const [tab, setTab] = useState('date');
    const [selectedDate, setSelectedDate] = useState(null); // State pentru data selectată
    const [selectedHour, setSelectedHour] = useState(null);

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

                ticketPrice, // Prețul biletului
                appointmentDate: formattedDate, // Data programării în format ISO string
                appointmentTime: selectedHour, // Ora programării ca string
                // Adaugă alte câmpuri necesare conform schemei backend-ului
            };

            const res = await fetch(`${process.env.BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`, // Token-ul de autorizare
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

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button onClick={() => setTab('date')} className={`  ${tab === 'date' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                    Date
                </button>
            </div>
            <div className='mt-[50px]'>
                {tab === 'date' && <Example onDateSelect={handleDateSelect} />}
                {tab === 'time' && <Time selectedDate={selectedDate} />}
            </div>
            <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                Fa programare
            </button>
        </div>
    );
}



{/* <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                Fa programare
            </button> */}