import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { Fragment, useEffect, useState } from 'react'
import Time from '@/app/(components)/doctors/Time';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { BASE_URL, token } from '@/app/config';

const today = new Date();

function AppointmentItem({ appointment }) {
    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <img
                src={appointment.patientPhoto}
                alt=""
                className="flex-none w-10 h-10 rounded-full"
            />
            <div className="flex-auto">
                <p className="text-gray-900">{appointment.patientName}</p>
                <p className="mt-0.5">
                    De la ora <time dateTime={appointment.appointmentTime}>
                        {appointment.appointmentTime}
                    </time>
                </p>
            </div>
        </li>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({ appointments, doctorId }) {
    console.log('appointments', appointments)
    console.log('doctorId', doctorId)
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayAppointments = appointments.filter((appointment) =>
        isSameDay(parseISO(appointment.appointmentDate), selectedDay)
    )

    const currentDate = format(new Date(), 'yyyy-MM-dd');

    const [formData, setFormData] = useState({
        timeSlots: []
    });

    const addItem = (key, item) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: [...prevFormData[key], item]
        }));
    }

    const addTimeSlot = (e) => {
        e.preventDefault();
        setShowForm(true);
    };


    const handleTimeSlotChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTimeSlots = formData.timeSlots.map((slot, i) =>
            i === index ? { ...slot, [name]: value } : slot
        );
        setFormData({ ...formData, timeSlots: updatedTimeSlots });
    };


    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        const updatedTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
        setFormData({ ...formData, timeSlots: updatedTimeSlots });
    };
    const [selectedHour, setSelectedHour] = useState(null);
    const [patientEmail, setPatientEmail] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        console.log(`Data selectată: ${selectedDay}, Ora selectată: ${hour}:00, Email: ${patientEmail}`);
    };

    const bookingHandler = async () => {
        try {
            const formattedDate = selectedDay.toISOString(); // Formatăm data ca string ISO dacă este necesar
            const bookingData = {
                appointmentDate: formattedDate, // Data programării în format ISO string
                appointmentTime: selectedHour, // Ora programării ca string
                email: patientEmail, // Adăugăm email-ul pacientului
                // Adaugă alte câmpuri necesare conform schemei backend-ului
            };
            console.log('bookingData', bookingData)
            const requestUrl = `${BASE_URL}/bookings/checkout-session/${doctorId}`;

            const res = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Token-ul de autorizare
                    'Content-Type': 'application/json', // Specificăm că trimitem date în format JSON
                },
                body: JSON.stringify(bookingData) // Convertim obiectul de date într-un string JSON
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'There was an error processing your request.');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Your booking is confirmed!',
                text: 'Thank you! Your booking has been successfully made.',
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.toString(),
            });
        }
    };


    return (
        <div className="pt-16">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                    <div className="md:pr-14">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy')}
                            </h2>
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) &&
                                            isToday(day) &&
                                            'text-red-500',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                            isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            'bg-gray-900',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <section className="md:pl-14 md:mt-0 lg:mt-0">
                        <h2 className="font-semibold text-gray-900">
                            Programați pentru{' '}
                            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                {format(selectedDay, 'MMM dd, yyy')}
                            </time>
                        </h2>
                        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                            {selectedDayAppointments.length > 0 ? (
                                selectedDayAppointments.map((appointment) => (
                                    <AppointmentItem appointment={appointment} key={appointment._id} />
                                ))
                            ) : (
                                <p>Fără programări astăzi.</p>
                            )}
                        </ol>
                        <button onClick={addTimeSlot} className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                            Add Time Slot
                        </button>

                        {showForm && (
                            <div className='mb-5'>
                                <div className='mb-[30px] gap-5'>
                                    <div>
                                        <p className='form__label'>Email Pacient*</p>
                                        <input
                                            name='email'
                                            value={patientEmail}
                                            className='form__input py-3.5'
                                            onChange={e => setPatientEmail(e.target.value)}
                                            type='email'
                                        />
                                    </div>

                                    {patientEmail && (
                                        <div>
                                            <p className='form__label'>Time*</p>
                                            {selectedHour ? (
                                                <input
                                                    name='time'
                                                    value={selectedHour}
                                                    className='form__input py-3.5'
                                                    onChange={e => setSelectedHour(e.target.value)}
                                                    type='time'
                                                />
                                            ) : (
                                                <Time selectedDate={selectedDay} onHourSelect={handleHourSelect} doctorId={doctorId} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}


                        {patientEmail && selectedHour && (
                            <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                                Fa programare
                            </button>
                        )}

                        {/* <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>
                            Fa programare
                        </button> */}
                        {/* <button onClick={bookingHandler} className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                            Fa programare
                        </button> */}



                    </section>
                </div>
            </div>
        </div>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
