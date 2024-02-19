import FormateDate from '@/app/utils/FormateDate'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import FeedbackForm from './FeedbackForm';

function Feedback() {

    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    return (
        <div>
            <div className='mb-[50px]'>
                <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
                    Toate review-urile (272)
                </h4>

                <div className="flex justify-between gap-10 mb-[30px]">
                    <div className='flex gap-3'>
                        <figure className='rounded-full'>
                            <Image src='\testimonial\undraw_pic_profile_re_7g2h.svg' alt='' width={40} height={40} />
                        </figure>

                        <div>
                            <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                                Ali ahmet
                            </h5>
                            <p className='text-[14px] leading-6 text-textColor'>
                                {FormateDate('02-14-2023')}
                            </p>
                            <p className='text__para mt-3 font-medium text-[15px]'>
                                Good service, highly recommended
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-1'>
                        {[...Array(5).keys()].map((_, index) => <AiFillStar key={index} color="#1E90FF" />)}
                    </div>
                </div>
            </div>

            {!showFeedbackForm && <div className="text-center">
                <button className='btn' onClick={() => setShowFeedbackForm(true)}>Feedback</button>
            </div>}

            {showFeedbackForm && <FeedbackForm />}

        </div>
    )
}

export default Feedback
