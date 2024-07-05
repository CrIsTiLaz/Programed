import React from 'react'
import Contact from './Contact'

export const metadata = {
    title: "Contact - Programed",
    description: "Contactează-ne rapid și ușor pentru programări la cei mai buni medici.",
    alternates: {
        canonical: `https://progra-med.ro/contact`
    },
    openGraph: {
        title: 'Contact - Programed',
        description: 'Contactează-ne rapid și ușor pentru programări la cei mai buni medici.',
        url: 'https://progra-med.ro/contact',
        images: [
            {
                url: 'https://progra-med.ro/og/og2.jpg', // Absolute URL to the image
                width: 600,
                height: 600,
            },
        ],
    },
};

function page() {
    return (
        <div>
            <Contact />
        </div>
    )
}

export default page