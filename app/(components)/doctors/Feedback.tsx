import FormateDate from '@/app/utils/FormateDate'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import FeedbackForm from './FeedbackForm';

function Feedback({ reviews, totalRating }) {

    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    console.log('reviews', reviews)
    return (
        <div>
            <div className='mb-[50px]'>
                <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] '>
                    Toate review-urile ({totalRating})
                </h4>

                {reviews?.map((review, index) =>
                (<div key={index} className="flex justify-between gap-10 mb-[30px]">
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
                </div>)
                )}
            </div>

            {!showFeedbackForm && <div className="text-center">
                <button className='btn' onClick={() => setShowFeedbackForm(true)}>Feedback</button>
            </div>}

            {showFeedbackForm && <FeedbackForm />}

        </div>
    )
}

export default Feedback
