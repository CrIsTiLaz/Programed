import { Button, Link } from '@mui/material'
import React from 'react'

function BusinessSignUp() {
    return (
        <div style={{
            backgroundColor: '#4A90E2', // Schimbați culoarea de fundal conform designului dvs.
            color: 'white',
            padding: '50px',
            borderRadius: '5px',

        }}>
            <h2 style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '35px' }}>Înregistrează-te gratuit acum ca și cabinet</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '25px' }}>Te ajutam sa fii disponibil online non-stop si sa primesti programari fara sa misti un deget.</p>

            <Button
                variant="contained"
                sx={{
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: "#FFF"
                    },
                    color: 'black',
                    border: 1,
                    borderColor: 'black',
                    background: "#FFF"
                }}
            >
                <Link
                    href="/business"
                    style={{ textDecoration: 'none', color: 'inherit' }} // stilul aplicat direct pe Link
                >
                    <p>Alăturați-vă ca profesionist</p>
                </Link>
            </Button>

        </div>
    )
}

export default BusinessSignUp