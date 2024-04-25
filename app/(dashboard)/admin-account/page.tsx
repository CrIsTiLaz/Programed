import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <p className='mt-5 text-textColor text-center'>
                Nu ai cont? <Link href="/doctor-register" className='text-primaryColor font-medium ml-1'>Inregistrare</Link>
            </p>
        </div>
    )
}

export default page