import FormateDate from '@/app/utils/FormateDate'
import React from 'react'

function ClinicsAbout() {
    return (
        <div>
            <div>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                    Despre
                    <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                        Muhibut ramadan
                    </span>
                </h3>
                <p className="text__para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus accusamus pariatur deserunt,
                    saepe quaerat ipsum iusto cumque cupiditate. Placeat sequi nobis deleniti. Neque molestias tempore natus nostrum impedit,
                    qui fuga hic beatae illo placeat nihil quas. Esse in exercitationem ducimus, possimus architecto, quaerat illum iure qui
                    obcaecati iusto, id totam?
                </p>
            </div>

            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Education
                </h3>
                <ul className='pt-4 md:p-5'>
                    <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{FormateDate('05-28-2008')}</span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
                        </div>

                        <p className='text-[14px] leading-5 font-medium text-textColor'>New Appolo Hospital, New York.</p>
                    </li>

                    <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{FormateDate('12-04-2010')}</span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
                        </div>

                        <p className='text-[14px] leading-5 font-medium text-textColor'>New Appolo Hospital, New York.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
// 25:39
export default ClinicsAbout