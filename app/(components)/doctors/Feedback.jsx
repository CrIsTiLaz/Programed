import FormateDate from '@/app/utils/FormateDate'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import FeedbackForm from './FeedbackForm';
import { motion } from 'framer-motion';

function Feedback({ reviews, totalRating }) {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4; // Numărul de review-uri pe pagină

    // Calculăm indexii pentru paginare
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Calculăm numărul total de pagini
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Funcții de navigare între pagini
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className='mb-[50px]'>
                <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] '>
                    Toate review-urile ({totalRating})
                </h4>

                {currentReviews.map((review, index) => (
                    <div key={index} className="flex justify-between gap-10 mb-[30px]">
                        <div className='flex gap-3'>
                            <div className='rounded-full'>
                                {review?.user?.photo ? (
                                    <Image src={review?.user?.photo} alt='' width={40} height={40} />
                                ) : (
                                    <Image src="/header/user64.png" alt="Default profile photo" width={40} height={40} />
                                )}
                            </div>

                            <div>
                                <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                                    {review?.user?.name}
                                </h5>
                                <p className='text-[14px] leading-6 text-textColor'>
                                    {FormateDate(review?.createdAt)}
                                </p>
                                <p className='text__para mt-3 font-medium text-[15px]'>
                                    {review.reviewText}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-1'>
                            {[...Array(review?.rating).keys()].map((_, index) => <AiFillStar key={index} color="#1E90FF" />)}
                        </div>
                    </div>
                ))}

                {/* Afișăm butoanele de navigare pentru paginare */}
                <div className='flex justify-center gap-4 mt-4'>
                    <div className="flex gap-2">
                        {/* <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={currentPage === totalPages ? 'opacity-60  text-white' : ''}
                                    >
                                        <motion.div whileHover={{ scale: 1.1 }}>
                                            Next

                                            <AiOutlineArrowRight className="inline-block ml-2" />
                                        </motion.div>

                                    </button> */}
                        <button className={currentPage === 1 ? 'opacity-60  text-white' : ''} onClick={prevPage} disabled={currentPage === 1}>
                            <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
                                <AiOutlineArrowLeft className="inline-block mr-2" />
                                Înapoi
                            </motion.div>
                        </button>
                        <button className={currentPage === totalPages ? 'opacity-60  text-white' : ''} onClick={nextPage} ><motion.div whileHover={{ scale: 1.1 }}>
                            Înainte

                            <AiOutlineArrowRight className="inline-block ml-2" />
                        </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            {!showFeedbackForm && <div className="text-center">
                <button className='btn' onClick={() => setShowFeedbackForm(true)}>Feedback</button>
            </div>}

            {showFeedbackForm && <FeedbackForm />}
        </div>
    );
}

export default Feedback;
