import React from 'react';
import Image from 'next/image'; // Presupunem că folosești Next.js pentru Image

function Benefits() {
    // Aici poți defini datele pentru beneficii, dacă nu sunt deja într-un context sau state

    const benefitsData = [
        {
            title: 'Review-uri autentice',
            description: 'Vezi recenzii de la pacienți reali',
            iconPath: '/path/to/review-icon.png', // Înlocuiește cu calea reală a iconiței
        },
        {
            title: 'Programări online ușoare',
            description: 'Programează-te în câteva minute',
            iconPath: '/path/to/appointment-icon.png',
        },
        {
            title: 'Economisește timp',
            description: 'Programarea este rapidă și simplă',
            iconPath: '/path/to/time-icon.png',
        },
        // ... alte beneficii
    ];

    return (
        <div style={{ textAlign: 'center', padding: '24px' }}>
            <h2 style={{ fontWeight: 'bold' }}>Beneficiile utilizarii SmileSeekkkkkkk</h2>
            <p style={{ margin: '20px 0' }}>Explorați .</p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {benefitsData.map((benefit, index) => (
                    <div key={index} style={{
                        width: '300px',
                        margin: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px'
                    }}>
                        {/* <Image src={benefit.iconPath} alt={benefit.title} width={64} height={64} /> */}
                        <h3 style={{ margin: '10px 0' }}>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Benefits;
