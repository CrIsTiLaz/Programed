import React from 'react';
import Image from 'next/image';
import Data from '@/Shared/Data';

function Benefits() {
    return (
        <div style={{ textAlign: 'center', paddingLeft: '24px', paddingRight: '24px', backgroundColor: "#FAFAFA" }}>
            <h1 style={{ fontWeight: 'bold', marginTop: '0', fontSize: '25px' }}>Beneficiile utilizarii SmileSeek</h1> {/* Ajustat marginTop la 0 */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {Data.benefitsData.map((benefit, index) => (
                    <div key={index} style={{
                        width: '300px',
                        height: '300px',
                        margin: '50px',
                        padding: '20px',
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backgroundColor: "#FFF"
                    }}>
                        <Image src={benefit.iconPath} alt={benefit.title} width={90} height={64} />
                        <h3 style={{ margin: '10px 0 30px', fontWeight: 'bold', fontSize: '18px' }}>{benefit.title}</h3>

                        <p style={{ fontSize: '17px' }}>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Benefits;
