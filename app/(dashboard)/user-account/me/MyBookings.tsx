import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/app/config';
import Error from '@/app/error/Error';
import Loading from '@/app/loading';
import DoctorCard from '@/app/(components)/doctors/DoctorCard';
import { motion } from 'framer-motion';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

function MyBookings() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 4;
    const [appointments, setAppointments] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${BASE_URL}/users/appointments/my-appointmentsDateAndTime?page=${currentPage}&perPage=${perPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }
                setAppointments(data.data);
                setTotalPages(data.totalPages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, perPage]);

    // console.log('appointments', appointments);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            {loading && <Loading />}
            {error && !loading && <Error errMessage={error} />}
            {!loading && !error && appointments.length > 0 && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {appointments.map((appointment) => (
                        <div key={appointment.appointmentId} className={`flex flex-col md:flex-row md:items-center gap-4 `}>
                            <DoctorCard
                                doctor={appointment.doctor}
                                appointmentDate={appointment.appointmentDate}
                                appointmentTime={appointment.appointmentTime}
                                appointmentId={appointment.appointmentId}
                            />
                        </div>
                    ))}
                    <div className="flex justify-center items-center mt-8">
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? 'opacity-60  text-white' : ''}
                            >
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <AiOutlineArrowLeft className="inline-block mr-2" /> Previous
                                </motion.div>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={currentPage === page ? 'bg-gray-100 rounded px-4 py-2' : ''}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? 'opacity-60  text-white' : ''}
                            >
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    Next <AiOutlineArrowRight className="inline-block ml-2" />
                                </motion.div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!loading && !error && appointments.length === 0 && (
                <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>NU ai făcut nicio rezervare.</h2>
            )}
        </div>
    );
}

export default MyBookings;
