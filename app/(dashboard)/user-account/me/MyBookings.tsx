import React from 'react'
import { BASE_URL } from '@/app/config'
import ClinicCard from '@/app/(components)/clinics/ClinicCard'
import Error from '@/app/error/Error'
import useFetchData from '@/app/hooks/useFetchData'
import Loading from '@/app/loading'

function MyBookings() {

    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`)
    // console.log('data: appointments', appointments)
    return (
        <div>
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && (<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                    appointments.map(doctor => (
                        <ClinicCard doctor={doctor} key={doctor.id} />))
                }
            </div>)}

            {!loading && !error && appointments.length === 0 && (
                <h2 className='mt-5 text-center  leading-7 text-[20px] font-semibold text-primaryColor'>NU ai facut nici o rezervare</h2>
            )}

        </div>
    )
}

export default MyBookings