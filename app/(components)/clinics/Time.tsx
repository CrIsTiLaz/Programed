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

        // Filtrare ore bazate pe programări existente
        return hours.filter(hour => {
            const hourString = `${format(selectedDate, 'yyyy-MM-dd')}T${hour}`;
            return !bookings.some(booking => {
                const bookingStart = new Date(booking.appointmentTime);
                const bookingEnd = addMinutes(bookingStart, consultationDuration);
                const checkTime = new Date(hourString);
                return booking.doctor._id === doctorId && checkTime >= bookingStart && checkTime < bookingEnd;
            });
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