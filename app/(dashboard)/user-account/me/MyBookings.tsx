import React from 'react'
import { BASE_URL } from '@/app/config'
import ClinicCard from '@/app/(components)/clinics/ClinicCard'
import Error from '@/app/error/Error'
import useFetchData from '@/app/hooks/useFetchData'
import Loading from '@/app/loading'

function MyBookings() {
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointmentsDateAndTime`);
    console.log('appo : ', appointments)
    return (
        <div>
            {loading && !error && <Loading />}
            {error && !loading && <Error errMessage={error} />}
            {!loading && !error && appointments && appointments.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {appointments.map((appointment) => (
                        <div key={appointment.doctorId} className="flex flex-col md:flex-row md:items-center gap-4">
                            <ClinicCard
                                doctor={appointment.doctor} // Transmite întregul obiect de programare, presupunând că acesta include detaliile doctorului
                                appointmentDate={appointment.appointmentDate}
                                appointmentTime={appointment.appointmentTime}
                            />
                        </div>
                    ))}
                </div>
            )}
            {!loading && !error && (!appointments || appointments.length === 0) && (
                <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>NU ai făcut nicio rezervare.</h2>
            )}
        </div>
    );
}

export default MyBookings;
