import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/app/config';
import Error from '@/app/error/Error';
import useFetchData from '@/app/hooks/useFetchData';
import Loading from '@/app/loading';
import ClinicCard from '@/app/(components)/clinics/ClinicCard';
import DoctorCard from '@/app/(components)/doctors/DoctorCard';

function MyBookings() {
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointmentsDateAndTime`);
    const [sortedAppointments, setSortedAppointments] = useState([]);

    useEffect(() => {
        if (appointments) {
            const now = new Date(); // Obține data curentă
            now.setHours(0, 0, 0, 0); // Resetează ora, minutele, secundele și milisecundele la 0

            const sorted = appointments.map(appointment => {
                const appointmentDate = new Date(appointment.appointmentDate);
                appointmentDate.setHours(0, 0, 0, 0); // Resetează ora, minutele, secundele și milisecundele la 0

                return {
                    ...appointment,
                    isExpired: appointmentDate < now,
                };
            }).sort((a, b) => a.isExpired === b.isExpired ? 0 : a.isExpired ? 1 : -1);
            setSortedAppointments(sorted);
        }
    }, [appointments]);

    return (
        <div>
            {loading && !error && <Loading />}
            {error && !loading && <Error errMessage={error} />}
            {!loading && !error && sortedAppointments.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {sortedAppointments.map((appointment) => (
                        <div key={appointment.doctorId} className={`flex flex-col md:flex-row md:items-center gap-4 `}>
                            <DoctorCard
                                doctor={appointment.doctor}
                                appointmentDate={appointment.appointmentDate}
                                appointmentTime={appointment.appointmentTime}
                                isExpired={appointment.isExpired}
                            />
                        </div>
                    ))}
                </div>
            )}
            {!loading && !error && sortedAppointments.length === 0 && (
                <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>NU ai făcut nicio rezervare.</h2>
            )}
        </div>
    );
}

export default MyBookings;
