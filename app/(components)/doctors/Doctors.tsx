"use client"; // top to the file
import { doctors } from '@/Shared/doctors';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import ClinicCard from './DoctorCard';
import Testimonial from '../(homepage)/testimonial/Testimonial';
import { BASE_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';
import Loading from '@/app/loading';
import Error from '@/app/error/Error';
import DoctorList from './DoctorList';
function Doctors() {

    // const { data, loading, error } = useFetchData(`${BASE_URL}/doctors`)

    const [query, setQuery] = useState('');

    const [debounceQuery, setDebounceQuery] = useState("")

    const handleSearch = () => {
        const sanitizedQuery = query.trim();
        // Validare simplă, exemplu: asigură că query-ul nu conține caractere speciale periculoase
        if (/^[a-zA-Z0-9\s]+$/.test(sanitizedQuery)) {
            setQuery(sanitizedQuery);
            console.log('handle search');
        } else {
            console.error('Query invalid!');
            // Afișează un mesaj de eroare utilizatorului
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceQuery(query)
        }, 700)

        return () => clearTimeout(timeout)

    }, [query])


    return (




        <section>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                                {doctors.map(doctor => (
                                    <ClinicCard key={doctor.id} doctor={doctor} />
                                ))}
                            </div> */}
            <DoctorList query={debounceQuery} />


        </section>



    )
}
"/howItWorks/Hospital building-rafiki.svg"
{/* <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textColor" size={24} /> */ }
{/* <motion.div key={index} whileHover={{ scale: 1.3, fontWeight: "bold" }}> */ }
{/* <button className='bg-primaryColor py-[15px] px-[35px] text-white font-[600] rounded-r-[50px]'>
Cauta
</button> */}
export default Doctors