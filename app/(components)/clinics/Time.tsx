import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import { format } from 'date-fns'; // Asumând că ai date-fns instalat pentru a formata datele

function Time({ selectedDate, onHourSelect }) {
    const [selectedHour, setSelectedHour] = useState(null);
    // Presupunem că orele disponibile pot varia în funcție de ziua selectată
    // Pentru simplitate, folosim aceleași ore pentru orice dată
    const hours = Array.from({ length: 10 }, (_, i) => i + 10);

    useEffect(() => {
        // Resetarea orei selectate la schimbarea datei
        setSelectedHour(null);
        // console.log(`Data selectată este: ${format(selectedDate, 'PPP')}`); // Formatează și afișează data selectată
    }, [selectedDate]);

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
                {hours.map((hour) => (
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
                ))}
            </List>
        </Container>
    );
}

export default Time;
