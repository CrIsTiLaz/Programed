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
        <>
            <section >
                <div className='container text-center'>
                    <h2 className='heading'>Gaseste un cabinet</h2>

                    <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] flex items-center justify-between rounded-[50px] relative'>

                        {/* <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textColor" size={24} /> */}
                        <input type="search"
                            className='py-4 pl-12 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
                            placeholder="Cauta Cabinet dupa nume sau specializare"
                            value={query}
                            onChange={e => setQuery(e.target.value)} />
                        <button className='bg-[#0066ff58] py-[15px] px-[35px] text-white font-[600] rounded-r-[50px]' onClick={handleSearch}>
                            <BiSearch size={30} />
                        </button>

                    </div>

                    <section>
                        <div className="container">
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                                {doctors.map(doctor => (
                                    <ClinicCard key={doctor.id} doctor={doctor} />
                                ))}
                            </div> */}
                            <DoctorList query={debounceQuery} />

                        </div>
                    </section>
                </div>
            </section>
            {/* <section>
                <div className="container">
                    <div className="xl:w-[470px] mx-auto">
                        <h2 className="heading text-center">Ce zic utlizatorii nostri</h2>
                        <p className="text__para text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt justo eget nunc dignissim lobortis.</p>
                    </div>
                    <Testimonial />
                </div>
            </section> */}
        </>
    )
}
"/howItWorks/Hospital building-rafiki.svg"
{/* <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-textColor" size={24} /> */ }
{/* <motion.div key={index} whileHover={{ scale: 1.3, fontWeight: "bold" }}> */ }
{/* <button className='bg-primaryColor py-[15px] px-[35px] text-white font-[600] rounded-r-[50px]'>
Cauta
</button> */}
export default Doctors