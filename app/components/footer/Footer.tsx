import Image from 'next/image';
import React from 'react';

function Footer() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '50vh', overflow: 'hidden' }}>
            <Image
                src="/dental.png"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Background"
                priority // Acest lucru asigură că imaginea se încarcă imediat
            />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex', // Folosim Flexbox
                justifyContent: 'space-between', // Separă conținutul în cele două coloane
                backgroundColor: '#FAFAFA',
                padding: '24px',
                borderRadius: '10px',
                width: '80%', // Ajustează în funcție de designul tău
                maxWidth: '1200px', // Ajustează în funcție de designul tău
                boxSizing: 'border-box'
            }}>
                {/* Coloana din stânga */}
                <div style={{ flex: 1, margin: '24px' }}> {/* Ajustează marginul după necesități */}
                    <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>SmileSeek</h1>
                    <p style={{ marginTop: '15px', fontSize: '20px' }}>Explorează experții din apropierea ta.</p>
                </div>

                {/* Coloana din dreapta */}
                <div style={{ flex: 1, margin: '24px' }}>
                    <p style={{ fontSize: '20px' }}>suportSmileSeek@gmail.com</p>
                    <p style={{ marginTop: '17px', fontSize: '20px' }}>&copy; 2024 SmileSeek. Toate drepturile rezervate</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;

{/* <h1 style={{ fontWeight: 'bold', marginTop: '0', fontSize: '25px' }}>SmileSeek</h1> */ }