import React from 'react'

function Error({ errMessage }) {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <h2 className='text-headingColor text-[20px] leading-[30px] font-semibold'>
                {errMessage}
            </h2>
        </div>
    )
}

export default Error