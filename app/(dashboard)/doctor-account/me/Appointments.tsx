import React from 'react'
import Image from 'next/image';
import formatDate from "../../../utils/FormateDate"
import convertTime from '@/app/utils/convertTime';
import Example from './AppointmentsCalendar';
import Ex from './Ex';

function Appointments({ appointments, doctorId }) {

    // Sortează programările în funcție de data și ora programării, de la cele mai apropiate la cele mai îndepărtate
    const sortedAppointments = appointments?.sort((a, b) => {
        // Convertim ambele date în obiecte Date pentru a le compara
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);

        // Compară întâi datele
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // Dacă datele sunt egale, compară orele
        // Presupunând că `appointmentTime` este inclus în `appointmentDate`, această parte nu este necesară
        // În caz contrar, aici ar fi logica de comparare a orelor, dacă `appointmentTime` ar fi separat

        return 0; // În cazul în care datele și orele sunt egale, nu se modifică ordinea
    });

    return (
        // <table className='w-full text-left text-sm text-gray-500'>
        //     <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        //         <tr>
        //             <th scope='col' className='px-6 py-3'>
        //                 Nume
        //             </th>
        //             <th scope='col' className='px-6 py-3'>
        //                 Gen
        //             </th>
        //             <th scope='col' className='px-6 py-3'>
        //                 Pret
        //             </th>
        //             <th scope='col' className='px-6 py-3'>
        //                 Data
        //             </th>
        //             <th scope='col' className='px-6 py-3'>
        //                 Ora
        //             </th>
        //         </tr>
        //     </thead>

        //     <tbody>
        //         {sortedAppointments?.map(item => <tr key={item._id}>

        //             <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
        //                 <Image src={item.user.photo} className='w-10 h-10 rounded-full' alt="" width={50} height={50} />
        //                 <div className="pl-3">
        //                     <div className='text-base font-semibold'>
        //                         {item.user.name}
        //                     </div>
        //                     <div className='text-normal text-gray-500'>
        //                         {item.user.email}
        //                     </div>
        //                 </div>
        //             </th>
        //             <td className='px-6 py-4'>
        //                 {item.user.gender}
        //             </td>
        //             <td className='px-6 py-4'>
        //                 {item.ticketPrice}
        //             </td>
        //             <td className='px-6 py-4'>
        //                 {formatDate(item.appointmentDate)}
        //             </td>
        //             <td className='px-6 py-4'>
        //                 {convertTime(item.appointmentTime)}
        //             </td>
        //         </tr>)}
        //     </tbody>
        // </table>
        <Example appointments={appointments} doctorId={doctorId} />
        // <Ex />
    )
}

export default Appointments;
