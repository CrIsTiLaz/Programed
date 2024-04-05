import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import useFetchData from '@/app/hooks/useFetchData';
import { BASE_URL } from '@/app/config';
import { addMinutes, format, parseISO } from 'date-fns';

function Time({ selectedDate, onHourSelect, doctorId }) {
    const [selectedHour, setSelectedHour] = useState(null);
    const { data: bookings } = useFetchData(`${BASE_URL}/bookings/bookings`);
    const { data: doctor } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);

    // Mapare zile din engleză în română
    const dayMap = {
        Monday: 'Luni',
        Tuesday: 'Marti',
        Wednesday: 'Miercuri',
        Thursday: 'Joi',
        Friday: 'Vineri',
        Saturday: 'Sambata',
        Sunday: 'Duminica',
    };

    useEffect(() => {
        setSelectedHour(null); // Reset ora selectată la schimbare datei/doctorului
    }, [selectedDate, doctorId, doctor]);

    const availableHours = (() => {
        if (!bookings || !doctor || !selectedDate) return [];

        // Obține ziua săptămânii în engleză și apoi traduce-o în română
        const dayOfWeekEng = format(selectedDate, 'EEEE');
        const dayOfWeek = dayMap[dayOfWeekEng];

        const workSchedule = doctor?.workSchedule?.find(schedule => schedule.dayOfWeek === dayOfWeek);

        console.log('dayOfWeek', dayOfWeek); // Verifică maparea

        if (!workSchedule) return [];

        let startTime = new Date(workSchedule.startTime);
        const endTime = new Date(workSchedule.endTime);
        const consultationDuration = workSchedule.consultationDuration;
        let hours = [];

        while (startTime < endTime) {
            hours.push(format(startTime, 'HH:mm'));
            startTime = addMinutes(startTime, consultationDuration);
        }
        console.log(`Data selectată este: ${format(selectedDate, 'yyyy-MM-dd')}`);

        // Filtrare ore bazate pe programări existente
        return hours.filter(hour => {
            const hourDateTimeString = `${format(selectedDate, 'yyyy-MM-dd')}T${hour}`;
            const hourDateTime = new Date(hourDateTimeString);

            const overlappingBookings = bookings.filter(booking => {
                if (!booking.appointmentDate || !booking.appointmentTime) {
                    return false;
                }

                const bookingDateUTC = booking.appointmentDate; // Aceasta ar trebui să fie un string UTC din baza de date.
                const bookingDateLocal = parseISO(bookingDateUTC); // Parsează într-un obiect Date, ajustat pentru UTC.
                const bookingDateTimeLocalString = `${format(bookingDateLocal, 'yyyy-MM-dd')}T${booking.appointmentTime}`;
                // Presupunem că timpul programărilor este local și construim un string de dată/timp corespunzător.
                const bookingDateTime = new Date(bookingDateTimeLocalString);
                // console.log('bookingDateTime', bookingDateTime)
                // console.log('hourDateTime', hourDateTime)
                console.log('bookingDateTime', bookingDateTime)
                if (bookingDateTime.getFullYear() === hourDateTime.getFullYear() &&
                    bookingDateTime.getMonth() === hourDateTime.getMonth() &&
                    bookingDateTime.getDate() === hourDateTime.getDate()) {
                    console.log('Datele sunt identice.');
                }

                if (bookingDateTime.getFullYear() === hourDateTime.getFullYear()) {
                    console.log('Anii sunt identice.');
                }

                if (bookingDateTime.getFullYear() === hourDateTime.getFullYear() &&
                    bookingDateTime.getMonth() === hourDateTime.getMonth()) {
                    console.log('Luniile sunt identic.');
                }


                if (bookingDateTime.getFullYear() === hourDateTime.getFullYear() &&
                    bookingDateTime.getMonth() === hourDateTime.getMonth() &&
                    bookingDateTime.getDate() === hourDateTime.getDate()) {
                    console.log('Zilele sunt identice.');
                } else {

                    console.log('bookingDateTime.getDate()', bookingDateTime.getDate())
                    console.log('hourDateTime.getDate()', hourDateTime.getDate())

                }

                const bookingEndDateTime = addMinutes(bookingDateTime, consultationDuration);

                return booking.doctor._id === doctorId && hourDateTime >= bookingDateTime && hourDateTime < bookingEndDateTime;
            });

            // Logăm programările care se suprapun cu ora/data selectată
            if (overlappingBookings.length > 0) {
                console.log(`Există ${overlappingBookings.length} programări care se suprapun cu data și ora selectată.`);
                console.log(overlappingBookings); // Afișăm detaliile programărilor suprapunătoare
            }

            // Determinăm dacă ora curentă este disponibilă (neocupată de vreo programare)
            return overlappingBookings.length === 0;
        });


    })();

    const handleHourClick = (hour) => {
        setSelectedHour(hour);
        if (onHourSelect) {
            onHourSelect(hour);
        }
    };

    if (!selectedDate) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Selectați o dată pentru a vedea orele disponibile.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <List>
                {availableHours.length > 0 ? (
                    availableHours.map((hour, index) => (
                        <ListItem
                            key={index}
                            divider
                            button
                            selected={selectedHour === hour}
                            onClick={() => handleHourClick(hour)}
                            sx={{
                                bgcolor: selectedHour === hour ? blue[100] : 'inherit',
                                '&:hover': {
                                    bgcolor: blue[50],
                                },
                            }}
                        >
                            <ListItemText primary={hour} />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="Nu sunt ore disponibile în această zi." />
                    </ListItem>
                )}
            </List>
        </Container>
    );
}

export default Time;