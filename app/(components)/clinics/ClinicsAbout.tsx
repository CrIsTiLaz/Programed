import React from 'react'

function ClinicsAbout({ name, address, email, services, description }) {
    const openingHours = {
        Luni: "08:00 - 16:00",
        Marti: "08:00 - 16:00",
        Miercuri: "08:00 - 16:00",
        Joi: "08:00 - 16:00",
        Vineri: "08:00 - 14:00",
        Sambata: "Inchis",
        Duminica: "Inchis"
    };

    const scheduleElements = Object.entries(openingHours).map(([day, hours], index) => (
        <div key={index}>
            <strong>{day}:</strong> {hours}
        </div>
    ));

    return (
        <div className="flex">
            <div className="flex-1">
                {/* Restul conținutului */}
                <p className="text__para">{description}</p>
                <div className='mt-12'>
                    <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                        Adresa
                    </h3>
                    <p className='pt-4'>{address}</p>
                </div>
            </div>
            <div className="w-1/4 pl-4">
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Orarrr
                </h3>
                <div className="mt-4">
                    {scheduleElements}
                </div>
            </div>
        </div>
    )
}

export default ClinicsAbout;
