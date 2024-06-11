import Image from 'next/image'
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import FormateDate from '@/app/utils/FormateDate';
import { AiOutlineDelete } from 'react-icons/ai';
import { BASE_URL } from '@/app/config';
import Swal from 'sweetalert2';

function DoctorCard({ doctor, appointmentDate, appointmentTime, isExpired, appointmentId }) {
    const { name, averageRating, totalRating, photo, specialization, medicalGrade, totalPatients, hospital } = doctor;

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Ești sigur?',
            text: "Această acțiune nu poate fi anulată!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1E90FF',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Da, șterge!',
            cancelButtonText: 'Anulează'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${BASE_URL}/bookings/booking/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    Swal.fire('Șters!', 'Rezervarea a fost ștearsă.', 'success');
                } else {
                    Swal.fire('Eroare!', 'A apărut o eroare la ștergerea rezervării.', 'error');
                }
            } catch (error) {
                Swal.fire('Eroare!', 'A apărut o eroare la ștergerea rezervării.', 'error');
            }
        }
    };

    return (
        <div className={`p-2 sm:p-3 lg:p-5 max-w-sm mx-auto bg-white rounded-lg shadow-md`}>
            <div className="aspect-w-16 aspect-h-9">
                <Image
                    width={300}
                    height={0}
                    sizes="100vw"
                    className="h-auto rounded-lg"
                    src={photo ? photo : "/header/user (4).png"}
                    alt="Profile photo"
                    style={{ filter: isExpired ? 'grayscale(100%)' : 'none' }}
                />
            </div>
            <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>{name}</h2>
            {appointmentDate && (
                <p className='mt-2 text-[18px] lg:text-[16px] text-headingColor leading-7 font-semibold'>
                    Data: {FormateDate(appointmentDate)}
                </p>
            )}
            {appointmentTime && (
                <p className='mt-2 text-[18px] lg:text-[16px] text-headingColor leading-7 font-semibold'>
                    Ora: {appointmentTime}
                </p>
            )}
            <div className="mt-2 lg:mt-4">
                <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[14px] lg:text-[16px] leading-7 font-semibold text-headingColor'>
                        <Image src='/clinics/Star.png' alt='' width={20} height={20} />
                        {averageRating.toFixed(1)}
                    </span>
                    <span className='text-[14px] lg:text-[16px] leading-7 font-[400] text-textColor'>
                        ({totalRating})
                    </span>
                </div>
                <div className='mt-2'>
                    <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 text-[15px] leading-4 lg:text-[15px] lg:leading-7 font-semibold rounded'>
                        {specialization}
                    </span>
                </div>
            </div>
            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div className='flex justify-start flex-grow'>
                    <span className='bg-[#fff9ea] text-yellowColor py-1 px-2 lg:py-2 lg:px-6 text-[15px] leading-4 lg:text-[15px] lg:leading-7 font-semibold rounded'>
                        Medic {medicalGrade}
                    </span>
                </div>
                <div className='flex items-center'>
                    {appointmentId && (
                        <button
                            className='btn bg-red-600 p-2 rounded-full text-white w-[44px] h-[44px] cursor-pointer mb-5 mt-6 flex items-center justify-center'
                            onClick={() => handleDelete(appointmentId)}
                            aria-label={`Delete appointment for ${name}`}
                        >
                            <AiOutlineDelete className='w-6 h-5' />
                        </button>
                    )}
                    <Link
                        className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none ml-2'
                        href={`/doctors/${doctor._id}`}
                    >
                        <BiRightArrowAlt className='group-hover:text-white w-6 h-5' />
                    </Link>
                </div>
            </div>
            {isExpired && (
                <p className="text-red-500 text-sm font-semibold mt-2">Expirat</p>
            )}
        </div>
    )
}

export default DoctorCard
