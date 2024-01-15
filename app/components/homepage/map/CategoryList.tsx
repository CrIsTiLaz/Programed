import Data from '@/Shared/Data';
import React, { useState } from 'react'
import Image from 'next/image'
function CategoryList() {
    const [categoryList, setCategoryList] = useState(Data.CategoryListData);
    const [selectedCategory, setSelectedCategory] = useState();
    return (
        <div>
            <h2 className='font-bold'>Select Food type</h2>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3' >
                {categoryList.map((item, index) => (
                    <div key={item.id} className={`flex flex-col
                     justify-center items-center bg-gray-100
                     p-2 m-2 rounded-lg grayscale hover:grayscale-0
                     cursor-pointer  ${selectedCategory == index ? 'grayscale-0 border-[1px] border-blue-400' : null}`} onClick={() => setSelectedCategory(index)}>
                        <Image src={item.icon} alt={item.name} width={60} height={60} />
                        {item.name}
                    </div>
                ))}
            </div>
        </div>

    )
}

export default CategoryList