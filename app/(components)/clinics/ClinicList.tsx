import React from 'react'
import { BASE_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';
import ClinicCard from './ClinicCard';
import Swipe from './Swipe';
import TestSwiper from './Swipe';
import Page from './Swipe';

function ClinicList({ query }) {

    const { data: clinics, loading, error } = useFetchData(`${BASE_URL}/clinics?query=${query}`)

    return (
        <>
            {loading && <Loading />}
            {error && <Error errMessage={'erroareeeeeeeeee'} />}
            {!loading && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
                {clinics.map(clinic => (
                    <ClinicCard key={clinic._id} clinic={clinic} />
                ))}
            </div>}
            <Page />
        </>
    )
}

export default ClinicList   