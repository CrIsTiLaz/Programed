import React, { useState, Suspense } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Importă icoana
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SearchIcon from '@mui/icons-material/Search';
import Animate from './animate';
import PageWrapper from '@/app/pageWrapper';

export const FormSectionPage = () => {
    const [location, setLocation] = useState('');
    const [service, setService] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        < PageWrapper>
            <div style={{
                display: 'flex',
                flexDirection: 'row', // Aranjează elementele pe orizontală
                height: '95vh',
                backgroundColor: '#4A90E2'
            }}>

                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ color: 'white', fontSize: '4rem', marginBottom: '20px' }}>
                        Zâmbete sănătoase<br />la un click distanță
                    </div>
                    <ArrowRightAltIcon sx={{
                        marginLeft: '10px',
                        color: 'white',
                        fontSize: '5rem',
                        animation: 'moveArrow 1s ease-in-out infinite',
                        verticalAlign: 'bottom' // Aliniază icoana cu textul
                    }} />
                    <Animate />

                </div>

                <style>
                    {`
                    @keyframes moveArrow {
                        0% { transform: translateX(0); }
                        50% { transform: translateX(10px); }
                        100% { transform: translateX(0); }
                    }
                `}
                </style>
                <i className="uil uil-arrow services__icon"></i>
                <Box
                    sx={{
                        width: '50%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 'auto', // Setează marginea de sus la auto
                        marginBottom: 'auto', // Setează marginea de jos la auto
                        marginRight: '150px',
                        marginLeft: 'auto',
                    }}
                >
                    <Typography variant="h5" component="h2" style={{ fontWeight: 'bold', marginBottom: '40px', marginTop: '20px' }}>
                        Creează o programare
                    </Typography>
                    <form>
                        <FormControl margin="normal" fullWidth sx={{ marginBottom: '30px' }} >
                            <InputLabel id="location-label" style={{ backgroundColor: 'white', paddingRight: '4px' }}>
                                <LocationOnIcon sx={{ color: '#4A90E2', verticalAlign: 'middle' }} />
                                Locație
                            </InputLabel>
                            <Select
                                labelId="location-label"
                                id="location"
                                value={location}
                                label="Locație"
                                onChange={handleLocationChange}
                                MenuProps={{
                                    sx: {
                                        '.MuiMenuItem-root': { // Aplică stiluri pentru fiecare MenuItem
                                            transition: 'background-color 0.3s ease', // Tranziție lină pentru culoarea de fundal
                                        },
                                        '.MuiMenuItem-root:hover': { // Stiluri pentru hover
                                            backgroundColor: '#4A90E2',
                                            color: 'white',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={10}>Timisoara</MenuItem>
                                <MenuItem value={20}>Cluj</MenuItem>
                                <MenuItem value={30}>Recas</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal" sx={{ marginBottom: '30px' }}>
                            <InputLabel
                                id="service-label"
                                sx={{
                                    paddingBottom: '5px', // Ajustează această valoare după necesități
                                    backgroundColor: 'white',
                                    paddingRight: '4px',
                                    '&.Mui-focused': {
                                        paddingTop: '6px', // Ajustează această valoare după necesități
                                        paddingBottom: '6px' // Asigură-te că ai suficient spațiu sub etichetă
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTooth} color="#4A90E2" style={{ fontSize: '1.3em', marginRight: '10px', verticalAlign: 'middle' }} />
                                Serviciu
                            </InputLabel>
                            <Select
                                labelId="service-label"
                                id="service"
                                value={service}
                                label="Serviciu"
                                onChange={handleServiceChange}
                                MenuProps={{
                                    sx: {
                                        '.MuiMenuItem-root': {
                                            transition: 'background-color 0.3s ease',
                                        },
                                        '.MuiMenuItem-root:hover': {
                                            backgroundColor: '#4A90E2',
                                            color: 'white',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={10}>Plomba</MenuItem>
                                <MenuItem value={20}>Albire</MenuItem>
                                <MenuItem value={30}>Consult</MenuItem>
                            </Select>
                        </FormControl>



                        <TextField
                            fullWidth
                            label="Data programării"
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                style={{ backgroundColor: '#4A90E2', color: 'white' }} // Înlocuiește #4A90E2 cu codul culorii dorite
                            >
                                Caută  <SearchIcon />
                            </Button>

                        </Box>
                    </form>
                </Box>
            </div>
        </PageWrapper>
    )
}
