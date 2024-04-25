import Data from '@/Shared/Data'
import React, { useState } from 'react'

function SelectRating() {
    const [selectedRating, setSelectedRating] = useState([]);
    const onSelectRating = (isChecked: boolean, value: number) => {
        if (isChecked) {
            setSelectedRating([...selectedRating, value])
        }
        else {
            setSelectedRating(selectedRating.filter((n) => n !== value))
        }
        // console.log(selectedRating)
    }

    return (
        <div className='px-2 mt-5'>
            <h2 className='font-bold'>SelectRating</h2>
            <div>
                {Data.ratingList.map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div key={index} className='flex justify-between'>
                        <label>{item.icon}</label>
                        <input type='checkbox' onChange={(e) => onSelectRating(e.target.checked, item.name)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectRating