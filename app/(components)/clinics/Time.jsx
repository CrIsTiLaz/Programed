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
        Tuesday: 'Marți',
        Wednesday: 'Miercuri',
        Thursday: 'Joi',
        Friday: 'Vineri',
        Saturday: 'Sâmbătă',
        Sunday: 'Duminică',
    };

    useEffect(() => {
        setSelectedHour(null); // Reset ora selectată la schimbare datei/doctorului
    }, [selectedDate, doctorId, doctor]);

    const availableHours = (() => {
        if (!bookings || !doctor || !selectedDate) return [];

        // Verifică dacă data selectată se încadrează într-o perioadă de concediu
        const isOnLeave = doctor.leavePeriods?.some(period => {
            const startLeave = parseISO(period.start);
            const endLeave = parseISO(period.end);
            const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
            return selectedDateString >= format(startLeave, 'yyyy-MM-dd') && selectedDateString <= format(endLeave, 'yyyy-MM-dd');
        });

        if (isOnLeave) {
            return []; // Nu sunt ore disponibile în zilele de concediu
        }

        const dayOfWeekEng = format(selectedDate, 'EEEE');
        const dayOfWeek = dayMap[dayOfWeekEng];
        const workSchedule = doctor?.workSchedule?.find(schedule => schedule.dayOfWeek === dayOfWeek);

        if (!workSchedule) return [];

        let startTime = new Date(workSchedule.startTime);
        const endTime = new Date(workSchedule.endTime);
        const consultationDuration = workSchedule.consultationDuration;
        let hours = [];

        // Generează toate orele posibile în intervalul de lucru al doctorului
        while (startTime < endTime) {
            hours.push(format(startTime, 'HH:mm'));
            startTime = addMinutes(startTime, consultationDuration);
        }

        // Filtrare ore bazate pe programări existente
        return hours.filter(hour => {
            const hourDateTimeString = `${format(selectedDate, 'yyyy-MM-dd')}T${hour}`;
            const hourDateTime = new Date(hourDateTimeString);

            // Verifică dacă ora este rezervată de pacienți
            const isPatientBooked = bookings.some(booking => {
                const bookingDateUTC = booking.appointmentDate;
                const bookingDateLocal = parseISO(bookingDateUTC);
                const bookingDateTimeLocalString = `${format(bookingDateLocal, 'yyyy-MM-dd')}T${booking.appointmentTime}`;
                const bookingDateTime = new Date(bookingDateTimeLocalString);

                const bookingEndDateTime = addMinutes(bookingDateTime, consultationDuration);

                return booking.doctor._id.toString() === doctorId.toString() && hourDateTime >= bookingDateTime && hourDateTime < bookingEndDateTime;
            });

            return !isPatientBooked;
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
