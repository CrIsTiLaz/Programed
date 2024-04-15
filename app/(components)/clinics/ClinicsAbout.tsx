import Example from '@/app/utils/Calendar'
import FormateDate from '@/app/utils/FormateDate'
import React from 'react'

function ClinicsAbout({ name, description, address }) {
    return (
        <div>
            <div>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                    Despre
                    <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                        {name}
                    </span>
                </h3>
                <p className="text__para">{description}
                </p>
            </div>

            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Adresa
                </h3>
                <p className='pt-4 '>

                    {address}




                </p>
            </div>
        </div>
    )
}
// 25:39
export default ClinicsAbout