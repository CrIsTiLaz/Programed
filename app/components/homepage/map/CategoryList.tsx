import React, { useState } from 'react'

import Image from 'next/image'
import Data from '@/Shared/Data';
function CategoryList({ onCategoryChange }) {
    const [categoryList, setCategoryList] = useState(Data.CategoryListData)
    const [selectedCategory, setSelectedCategory] = useState();
    return (
        <div>
            <h2 className='font-bold px-4'>
                Selecteaza tipul serviciului
            </h2>
            <div className='grid grid-cols-2 gap-2 px-2'>
                {categoryList.map((item, index) => (
                    <div key={index} className={`flex flex-col
            justify-center items-center bg-gray-100
            p-2 m-2 rounded-lg grayscale 
            hover:grayscale-0 cursor-pointer
            text-[15px] w-full
            border-purple-400
            ${selectedCategory == index
                            ? 'grayscale-0 border-[1px]'
                            : null}`
                    }
                        onClick={() => { setSelectedCategory(index); onCategoryChange(item.value) }}>
                        <Image src={item.icon}
                            alt={item.name}
                            width={40}
                            height={40}
                        />
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryList