import Image from 'next/image'
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import FormateDate from '@/app/utils/FormateDate';

function DoctorCard({ doctor, appointmentDate, appointmentTime, isExpired }) { // Adaugă isExpired ca prop    // Presupunând că toate aceste date sunt acum incluse în obiectul "doctor"
    const { name, averageRating, totalRating, photo, specialization, medicalGrade, totalPatients, hospital } = doctor;
    // console.log('appointmentDate', appointmentDate)
    if (isExpired == true) {
        console.log('isExpired', isExpired)
    }
    console.log('avgRating', averageRating)
    console.log('totalRating', totalRating)
    return (
        <div className={`p-2 sm:p-3 lg:p-5 max-w-sm mx-auto bg-white rounded-lg shadow-md`}>
            <div className="aspect-w-16 aspect-h-9">
                {
                    <Image
                        width={300}
                        height={0}
                        sizes="100vw"
                        className=" h-auto rounded-lg"
                        src={photo ? photo : "/header/user (4).png"}
                        alt="Profile photo"
                        style={{ filter: isExpired ? 'grayscale(100%)' : 'none' }}
                    />
                }
            </div>

            <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>{name}</h2>

            {/* Afișează data și ora dacă sunt furnizate */}
            {/* Afișează data și ora cu stilul verde */}
            {appointmentDate && (
                <p className='mt-2 text-[18px] lg:text-[16px] text-headingColor leading-7 font-semibold' >
                    Data: {FormateDate(appointmentDate)}
                </p>
            )}

            {appointmentTime && (
                <p className='mt-2 text-[18px] lg:text-[16px] text-headingColor leading-7 font-semibold' >
                    Ora: {appointmentTime}
                </p>
            )}

            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[15px] leading-4
                 lg:text-[15px] lg:leading-7 font-semibold rounded'>
                    {specialization}
                </span>

                <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[14px] lg:text-[16px] leading-7 font-semibold text-headingColor'>
                        <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                        {averageRating.toFixed(1)}
                    </span>

                    <span className='text-[14px]  lg:text-[16px] leading-7 font-[400] text-textColor'>
                        ({totalRating})
                    </span>
                </div>
            </div>

            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div className='flex justify-start flex-grow'>
                    <span className='bg-[#fff9ea] text-yellowColor py-1 px-2 lg:py-2 lg:px-6 text-[15px] leading-4
                 lg:text-[15px] lg:leading-7 font-semibold rounded'>
                        Medic {medicalGrade}
                    </span>

                    {/* <span className='bg-[#e7c1ff] text-purpleColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4
                 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                        medic primar
                    </span> */}

                </div>

                <Link className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                    href={`/doctors/${doctor._id}`}>
                    <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                </Link>
            </div>
            {isExpired && (
                <p className="text-red-500 text-sm font-semibold mt-2">Expirat</p>
            )}
        </div>
    )
}

export default DoctorCard


// import React from 'react';
// import { BiRightArrowAlt } from 'react-icons/bi';
// import Link from 'next/link';
// import FormateDate from '@/app/utils/FormateDate';

// function ClinicCard({ doctor, appointmentDate, appointmentTime, isExpired }) {
//     // Destructurăm obiectul doctor pentru a extrage informațiile necesare
//     const { name, avgRating, totalRating, photo, specialization, medicalGrade, _id } = doctor;

//     return (
//         <div className={`p-3 lg:p-5 ${isExpired ? 'bg-gray-100' : 'bg-white'}`}>
//             <div className={`w-full h-[200px] ${isExpired ? 'grayscale' : ''}`}>
//                 {photo ? (
//                     // <Image className={`w-full ${isExpired ? 'bg-gray-100' : 'bg-white'}`} src={photo} width={200} height={200} alt="User profile photo" />
//                     <img className="w-full  object-cover" src={photo} alt="Doctor profile photo" style={{ filter: isExpired ? 'grayscale(100%)' : 'none' }} />
//                 ) : (
//                     <img className="w-full  object-cover" src="/header/user (4).png" width={200} height={200} alt="Default profile photo" style={{ filter: isExpired ? 'grayscale(100%)' : 'none' }} />
//                 )}
//             </div>

//             <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>{name}</h2>

//             {appointmentDate && (
//                 <p className='mt-2 text-[14px] lg:text-[16px] text-headingColor'>
//                     Data: {FormateDate(appointmentDate)}
//                 </p>
//             )}

//             {appointmentTime && (
//                 <p className='text-[14px] lg:text-[16px] text-headingColor'>
//                     Ora: {appointmentTime}
//                 </p>
//             )}

//             <div className="mt-2 lg:mt-4 flex items-center justify-between">
//                 <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
//                     {specialization}
//                 </span>

//                 <div className='flex items-center gap-[6px]'>
//                     <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] leading-7 font-semibold text-headingColor'>
//                         <img src='/clinics/Star.png' alt='Rating Star' width={20} height={20} />
//                         {avgRating}
//                     </span>

//                     <span className='text-[14px] leading-6 lg:text-[16px] leading-7 font-[400] text-textColor'>
//                         ({totalRating})
//                     </span>
//                 </div>
//             </div>

//             <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
//                 <div className='flex justify-start flex-grow'>
//                     <span className='bg-[#fff9ea] text-yellowColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
//                         Medic {medicalGrade}
//                     </span>
//                 </div>

//                 <Link className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
//                     href={`/clinics/${doctor._id}`}>
//                     <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
//                 </Link>
//             </div>

//             {isExpired && (
//                 <p className="text-red-500 text-sm font-semibold mt-2">Expirat</p>
//             )}
//         </div>
//     );
// }

// export default ClinicCard;
