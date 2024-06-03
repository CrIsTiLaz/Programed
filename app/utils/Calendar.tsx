import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
    add,
    addMinutes,
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
import { Fragment, useState } from 'react'
import useFetchData from '../hooks/useFetchData';
import { BASE_URL } from '../config';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({ onDateSelect, doctorId }) {
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    const { data: doctor } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);
    const { data: bookings } = useFetchData(`${BASE_URL}/bookings/bookings`);
    console.log('doctorIddddddddddddddddddd', doctorId)
    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        if (onDateSelect) {
            onDateSelect(day); // Trimite direct obiectul Date către funcția callback
        }
    };
    const dayMap = {
        Monday: 'Luni',
        Tuesday: 'Marti',
        Wednesday: 'Miercuri',
        Thursday: 'Joi',
        Friday: 'Vineri',
        Saturday: 'Sambata',
        Sunday: 'Duminica',
    };

    const shouldShowGreenDot = (day) => {
        const dayOfWeekEng = format(day, 'EEEE');
        const dayOfWeek = dayMap[dayOfWeekEng];
        const workScheduleDay = doctor?.workSchedule?.find(schedule => schedule.dayOfWeek === dayOfWeek);

        if (!workScheduleDay) return false;

        let startTime = new Date(workScheduleDay.startTime);
        const endTime = new Date(workScheduleDay.endTime);
        const slots = [];
        while (startTime < endTime) {
            slots.push(format(startTime, 'HH:mm'));
            startTime = addMinutes(startTime, workScheduleDay.consultationDuration);
        }

        const dayString = format(day, 'yyyy-MM-dd');
        const doctorReservedTimes = doctor?.timeSlots?.filter(slot => format(parseISO(slot.day), 'yyyy-MM-dd') === dayString).map(slot => slot.time);

        // Verifică dacă data selectată se încadrează într-o perioadă de concediu
        const isOnLeave = doctor?.leavePeriods?.some(period => {
            const startLeave = parseISO(period.start);
            const endLeave = parseISO(period.end);
            return day >= startLeave && day <= endLeave;
        });

        if (isOnLeave) {
            return false; // Ziua este în concediu, deci nu sunt ore disponibile
        }

        // Verifică fiecare slot pentru a vedea dacă este ocupat de rezervările pacienților sau de medic
        const isAnySlotAvailable = slots.some(slotTime => {
            const isBooked = bookings.some(booking => {
                const bookingDateStr = format(parseISO(booking.appointmentDate), 'yyyy-MM-dd');
                const bookingTime = booking.appointmentTime; // Presupunem că este deja în formatul 'HH:mm'
                return dayString === bookingDateStr && slotTime === bookingTime;
            });

            const isDoctorReserved = doctorReservedTimes.includes(slotTime);

            return !isBooked && !isDoctorReserved;
        });

        return isAnySlotAvailable;
    };




    // pentru ecran de tableet nu e responsive calendarul
    return (
        <div className="pt-10">
            <div className=" px-4 mx-auto sm:px-7  md:px-6">
                <div className=" md:divide-x md:divide-gray-200">
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
                            <button
                                onClick={nextMonth}
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
                                        'py-1.5 relative' // Adăugat clasă pentru poziționare relativă
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleDaySelect(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) && isToday(day) && 'text-primaryColor',
                                            !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                            !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-primaryColor',
                                            isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                                    </button>
                                    {/* Verifică dacă ar trebui afișată bulina verde sau roșie */}
                                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full ${shouldShowGreenDot(day) ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                </div>
                            ))}
                        </div>


                    </div>
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