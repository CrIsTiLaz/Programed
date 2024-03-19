import React from 'react'
import { BASE_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';
import ClinicCard from './ClinicCard';

function DoctorList({ query }) {

    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors?query=${query}`)

    return (
        <>
            {loading && <Loading />}
            {error && <Error errMessage={'erroareeeeeeeeee'} />}
            {!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                {doctors.map(doctor => (
                    <ClinicCard key={doctor._id} doctor={doctor} />
                ))}
            </div>}
        </>
    )
}

export default DoctorList   