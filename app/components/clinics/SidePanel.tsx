import React from 'react'

export default function SidePanel() {
    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
            <div className="flex items-center justify-between">
                <p className='text__para mt-0 font-semibold'>
                    Pret consultatie
                </p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                    500 lei
                </span>
            </div>

            <div className="mt-[30px]">
                <p className='text__para mt-0 font-semibold text-headingColor'>Ore disponibile</p>
                <ul className='mt-3'>
                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            Duminica
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            4:00 PM - 9:30PM
                        </p>
                    </li>

                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            Marti
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            4:00 PM - 9:30PM
                        </p>
                    </li>

                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            Miercuri
                        </p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>
                            4:00 PM - 9:30PM
                        </p>
                    </li>
                </ul>
            </div>

            <button className='btn px-2 w-full rounded-md'>
                Fa programare
            </button>
        </div>
    )
}
//45