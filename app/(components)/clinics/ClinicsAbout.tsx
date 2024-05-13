import React from 'react'
import { FaLocationDot } from 'react-icons/fa6';

function ClinicsAbout({ name, address, email, services, description, openingHours }) {
    console.log('openingHours', openingHours)
    // const openingHours = {
    //     Luni: "08:00 - 16:00",
    //     Marti: "08:00 - 16:00",
    //     Miercuri: "08:00 - 16:00",
    //     Joi: "08:00 - 16:00",
    //     Vineri: "08:00 - 14:00",
    //     Sambata: "Inchis",
    //     Duminica: "Inchis"
    // };

    const formatHours = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
    };

    // Mapăm fiecare obiect de orar la un element JSX
    const fullWeek = ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];

    // if (!Array.isArray(openingHours)) {
    //     console.error('Expected openingHours to be an array, received:', openingHours);
    //     return null;  // or some fallback UI
    // }

    // Crearea unui obiect pentru a ușura accesul la orare pe baza zilei
    const hoursByDay = {};
    openingHours?.forEach(({ dayOfWeek, startTime, endTime }) => {
        hoursByDay[dayOfWeek] = { startTime, endTime };
    });

    // Generăm elementele de orar pentru fiecare zi a săptămânii
    const scheduleElements = fullWeek.map(day => {
        if (hoursByDay[day]) {
            return (
                <tr key={day}>
                    <td className="pr-40"><strong>{day}:</strong></td>
                    <td>{hoursByDay[day] ? `${formatHours(hoursByDay[day].startTime)} - ${formatHours(hoursByDay[day].endTime)}` : 'Închis'}</td>
                </tr>
            );
        } else {
            return (
                <tr key={day}>
                    <td><strong>{day}:</strong></td>
                    <td className="text-red-500">Închis</td>
                </tr>
            );
        }
    });
    // mt - 3 grid grid - cols - 1 sm: grid - cols - 5 md: grid - cols - 3 lg: grid - cols - 1 gap - 1 '>
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-60">
            <div className="col-span-1 mt-12">
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Adresa
                </h3>
                <div>
                    <FaLocationDot className="inline-block" />
                    <p className='inline-block pt-4 ml-2'>{address}</p>
                </div>
                <div className="mt-4">
                    <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                        Descriere
                    </h3>
                    <p className="text__para" style={{ wordWrap: 'break-word' }}>
                        {description}
                    </p>
                </div>
            </div>
            <div className="col-span-1 mt-12 lg:mt-mt-12 ">
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Program
                </h3>
                <table>
                    <tbody>
                        {scheduleElements}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClinicsAbout;
