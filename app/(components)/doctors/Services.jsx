import React from 'react';
import { BASE_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';

function Services({ doctorId }) {
    const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error loading services: {error}</div>;

    return (
        <div>
            <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
                Services
            </h4>

            {doctor && doctor.services && doctor.services.length > 0 ? (
                <div className='grid grid-cols-1 gap-4'>
                    {doctor.services.map((service, index) => (
                        <div key={index} className="grid grid-cols-[3fr_1fr] gap-4">
                            <div className='text-headingColor text-[16px] leading-6 font-semibold'>
                                {service.name}
                            </div>
                            <div className='text-right text-irisBlueColor font-semibold' >
                                {service.price} lei
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No services available.</div>
            )}
        </div>
    );
}

export default Services;
