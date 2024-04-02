import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import useFetchData from '@/app/hooks/useFetchData';
import { BASE_URL } from '@/app/config';
import { format, parseISO } from 'date-fns';

function Time({ selectedDate, onHourSelect, doctorId }) {
    const [selectedHour, setSelectedHour] = useState(null);
    const { data: bookings, loading, error } = useFetchData(`${BASE_URL}/bookings/bookings`);

    const { data: doctor } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);

    const hours = Array.from({ length: 10 }, (_, i) => i + 10); // Presupunem orele de lucru de la 10 la 19

    // console.log('bookings', bookings);
    // console.log('`${BASE_URL}/bookings/bookings`', `${BASE_URL}/bookings/bookings`)
    useEffect(() => {
        setSelectedHour(null); // Resetăm ora selectată la schimbarea datei sau a doctorului
    }, [selectedDate, doctorId, doctor]); // Adaugă doctor ca dependență dacă datele acestuia se pot schimba

    const availableHours = bookings && doctor && Array.isArray(bookings) && Array.isArray(doctor.timeSlots) ? hours.filter(hour => {
        const dateString = format(selectedDate, 'yyyy-MM-dd');
        const hourString = `${hour}:00`;

        // Verifică dacă ora este deja rezervată în appointments
        const isBooked = bookings.some(appointment => {
            let appointmentDateString = appointment.appointmentDate
                ? format(parseISO(appointment.appointmentDate), 'yyyy-MM-dd')
                : null;
            const appointmentTimeString = `${appointment.appointmentTime}:00`;

            return appointmentDateString === dateString &&
                appointmentTimeString === hourString &&
                appointment.doctor._id === doctorId;
        });
        console.log('doctor.timeSlots', doctor.timeSlots)
        // Verifică dacă ora este rezervată de doctor în timeSlots
        const isReservedByDoctor = doctor.timeSlots.some(slot => {
            const slotDateString = slot.day ? format(parseISO(slot.day), 'yyyy-MM-dd') : null;
            const slotHourString = slot.time; // Formatul este "HH:MM", corespunde cu ceea ce avem nevoie
            return slotDateString === dateString && slotHourString === hourString;
        });

        return !isBooked && !isReservedByDoctor;
    }) : [];



    // console.log('Ore disponibile după filtrare:', availableHours);

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
                    availableHours.map(hour => (
                        <ListItem
                            key={hour}
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
                            <ListItemText primary={`${hour}:00`} />
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
