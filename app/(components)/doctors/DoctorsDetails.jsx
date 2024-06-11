// "use client"
// import Image from 'next/image'
// import React, { useState } from 'react'
// import ClinicsAbout from './ClinicsAbout';
// import Feedback from './Feedback';
// import SidePanel from './SidePanel';


// function ClinicsDetails() {

//     const [tab, setTab] = useState('despre');

//     return (
//         <section>
//             <div className='max-w-[1170px] px-5 mx-auto'>
//                 <div className='grid md:grid-cols-3 gap-[50px]'>
//                     <div className='md:col-span-2'>
//                         <div className="flex items-center gap-5">
//                             <div className='max-w-[200px] max-h-[200px]'>
//                                 <Image src='/clinics/doctor-img01.png' alt='' className='w-full' width={400} height={400} />
//                             </div>

//                             <div>
//                                 <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px:6 text-[12px] leading-4
//                                 lg:text-[16px] lg:leading-7 font-semibold rounded'>
//                                     Surgeon
//                                 </span>
//                                 <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
//                                     Muhibut ramadan
//                                 </h3>
//                                 <div className='flex items-center gap-[6px]'>
//                                     <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
//                                         <Image src='/clinics/Star.png' alt='' width={20} height={20} /> 4.8
//                                     </span>
//                                     <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
//                                         (272)
//                                     </span>
//                                 </div>

//                                 <p className='text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]'>
//                                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, amet.
//                                 </p>

//                             </div>
//                         </div>
//                         <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
//                             <button
//                                 onClick={() => setTab('despre')}
//                                 className={`  ${tab === 'despre' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
//                                 Despre
//                             </button>

//                             <button
//                                 onClick={() => setTab('feedback')}
//                                 className={`  ${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
//                                 Feedback
//                             </button>

//                             <button
//                                 onClick={() => setTab('detalii')}
//                                 className={`  ${tab === 'detalii' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
//                                 Detalii
//                             </button>
//                         </div>
//                         <div className='mt-[50px]'>
//                             {
//                                 tab === 'despre' && <ClinicsAbout />
//                             }
//                             {
//                                 tab === 'feedback' && <Feedback />
//                             }
//                         </div>
//                     </div>
//                     <div>
//                         <SidePanel />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default ClinicsDetails