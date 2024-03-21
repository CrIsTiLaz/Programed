import React from 'react';
import Swal from 'sweetalert2';
import convertTime from '@/app/utils/convertTime';
import { BASE_URL, token } from '@/app/config';
import Error from '@/app/error/Error';
import { useRouter } from 'next/navigation';
import Example from '@/app/utils/Calendar';

export default function SidePanel({ doctorId, ticketPrice, timeSlots }) {
    const router = useRouter();

    const bookingHandler = async () => {

        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'There was an error processing your request.');
            }

            // Afisam confirmarea rezervarii
            await Swal.fire({
                icon: 'success',
                title: 'Your booking is confirmed!',
                text: 'Thank you! Your booking has been successfully made.',
                willClose: () => {
                    // Redirectionam utilizatorul la pagina CheckoutSuccess dupa ce Sweet Alert se inchide
                    router.push('/bookings');
                    // navigate('/CheckoutSuccess');
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
                <p className='text__para mt-0 font-semibold'>
                    Pret consultatie
                </p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                    {ticketPrice} lei
                </span>
            </div>

            <div className="mt-[30px]">
                <p className='text__para mt-0 font-semibold text-headingColor'>Ore disponibile</p>


                <Example />

                {/*  {timeSlots?.map((item, index) => (
                        <li key={index} className='flex items-center justify-between mb-2'>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                            </p>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>
                                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                            </p>
                        </li>
                    ))} */}


            </div>

            <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                Fa programare
            </button>
        </div>
    )
}
//45