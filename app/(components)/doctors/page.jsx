import { services } from '@/Shared/services'
import React from 'react'
import Clinics from './Doctors'
import Doctors from './Doctors'

function page() {
    return (
        <section>
            <Doctors />
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