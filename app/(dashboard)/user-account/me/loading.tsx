import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

function Loading() {
    // console.log('loading is working')
    return (

        <div className="fullscreen-loader">
            <ClipLoader color="#1E90FF" size={50} />
        </div>

    )
}

export default Loading