import { services } from '@/Shared/services'
import React from 'react'
import Clinics from './Clinics'
export const metadata = {
    title: "Cabinete - Programed",
    description: "Descoperă cele mai bune cabinete medicale și programează-te rapid și ușor.",
    alternates: {
        canonical: `https://progra-med.ro/clinics`
    },
    openGraph: {
        title: 'Cabinete - Programed',
        description: 'Descoperă cele mai bune cabinete medicale și programează-te rapid și ușor.',
        url: 'https://progra-med.ro/clinics',
        images: [
            {
                url: 'https://progra-med.ro/og/og2.jpg', // Absolute URL to the image
                width: 600,
                height: 600,
            },
        ],
    },
};

function page() {
    return (
        <section>
            <Clinics />
            {/* <div className='container'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] ">
                    {services.map((item, index) => (
                        <ServiceCard item={item} index={index} key={index} />
                    ))}
                </div>
                
            </div> */}
        </section>
    )
}

export default page 