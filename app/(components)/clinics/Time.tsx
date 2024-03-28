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
//trebuie sa fac un endpoint care sa extraga toate bookingurilke
function Time({ selectedDate, onHourSelect, doctorId }) {
    const [selectedHour, setSelectedHour] = useState(null);

    // Ajustează această adresă URL conform nevoilor backend-ului tău
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointmentsDateAndTime`);

    const hours = Array.from({ length: 10 }, (_, i) => i + 10); // Presupunem orele de lucru de la 10 la 19
    console.log('appointments', appointments)
    useEffect(() => {
        setSelectedHour(null); // Resetăm ora selectată la schimbarea datei sau a doctorului
    }, [selectedDate, doctorId]);

    const availableHours = hours.filter(hour => {
        const dateString = format(selectedDate, 'yyyy-MM-dd');
        const hourString = `${hour}:00`;

        console.log('doctorId ca parametru:', doctorId);

        return !appointments.some(appointment => {
            console.log('Verificare appointment:', {
                'doctorId ca parametru': doctorId,
                'appointment.doctor._id': appointment.doctor._id,
                'appointment.appointmentTime': appointment.appointmentTime,
                'appointment.appointmentDate': appointment.appointmentDate
            });
            if (appointment.doctor._id === doctorId) {
                console.log('am gasit doctorul')
            }
            // Asigurăm că appointment.appointmentDate este definit și convertim la 'yyyy-MM-dd'
            let appointmentDateString = appointment.appointmentDate
                ? format(parseISO(appointment.appointmentDate), 'yyyy-MM-dd')
                : null;

            const appointmentTimeString = `${appointment.appointmentTime}:00`;
            if (appointmentDateString === dateString) {
                console.log('am gasit data egala')
            }
            console.log('appointment.appointmentTime', appointment.appointmentTime);
            console.log('hourString', hourString);

            if (appointmentTimeString === hourString) {
                console.log('am gasit ora egala')
            }

            // Folosim dateString pentru comparație, care este acum în format 'yyyy-MM-dd'
            return appointmentDateString === dateString &&
                appointmentTimeString === hourString &&
                appointment.doctor._id === doctorId;
        });
    });


    console.log('Ore disponibile după filtrare:', availableHours);

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
            <Typography variant="h4" component="h2" gutterBottom>
                Orele disponibile pentru {format(selectedDate, 'PPP')}
            </Typography>
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


