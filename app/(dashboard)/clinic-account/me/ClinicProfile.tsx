import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import uploadImageToCloudinary from '@/app/utils/uploadCloudinary';
import { BASE_URL, token } from '@/app/config';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from 'react-icons/ai';

function Profile({ clinicData }) {
    const [formData, setFormData] = useState({
        name: clinicData?.name || '',
        email: clinicData?.email || '',
        phone: clinicData?.phone || '',
        address: clinicData?.address || '',
        specialization: clinicData?.specialization || '',
        description: clinicData?.description || '',
        services: clinicData?.services || [],
        openingHours: clinicData?.openingHours || {},
        photos: clinicData?.photos || []
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateProfileHandler = async e => {
        e.preventDefault();
        const payload = { ...formData };  // Exclude doctors and reviews
        console.log("Sending payload to server:", payload);

        try {
            const response = await fetch(`${BASE_URL}/clinics/${clinicData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Clinic profile has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                title: 'Error!',
                text: error.toString(),
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    const addPhoto = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            photos: [...prevFormData.photos, '']
        }));
    };

    const updatePhoto = (index, value) => {
        const newPhotos = [...formData.photos];
        newPhotos[index] = value;
        setFormData({ ...formData, photos: newPhotos });
    };

    const deletePhoto = (index) => {
        const newPhotos = formData.photos.filter((_, i) => i !== index);
        setFormData({ ...formData, photos: newPhotos });
    };

    const handleFileInputChange = async (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const data = await uploadImageToCloudinary(file);
            if (data?.url) {
                updatePhoto(index, data.url);
            } else {
                console.log("Failed to receive URL from Cloudinary");
            }
        }
    };

    return (
        <div>
            <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
                Clinic Profile Information
            </h2>

            <form onSubmit={updateProfileHandler}>
                <div className="mb-5">
                    <label className="form__label">Clinic Name*</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form__input" required />
                </div>
                <div className="mb-5">
                    <label className="form__label">Email*</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form__input" required readOnly />
                </div>
                <div className="mb-5">
                    <label className="form__label">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form__input" />
                </div>
                <div className="mb-5">
                    <label className="form__label">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form__input" />
                </div>
                <div className="mb-5">
                    <label className="form__label">Specialization</label>
                    <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} className="form__input" />
                </div>
                <div className="mb-5">
                    <label className="form__label">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} className="form__input" rows="4"></textarea>
                </div>
                <div className="mb-5">
                    <p className='form__label'>Photos*</p>
                    {formData.photos.map((photo, index) => (
                        <div key={index} className='mb-5 flex items-center gap-3'>
                            {photo && (
                                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                                    <img src={photo} alt={`Photo ${index + 1}`} width={50} height={50} />
                                </figure>
                            )}
                            <div className='relative w-[130px] h-[50px]'>
                                <input
                                    type='file'
                                    id={`file-input-${index}`} // Asigură-te că fiecare input are un ID unic
                                    onChange={(e) => handleFileInputChange(index, e)}
                                    accept='.jpg, .png'
                                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                />
                                <label htmlFor={`file-input-${index}`} className='absolute top-0 left-0 w-50 h-full flex items-center px-[0.75rem] 
            py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg
            truncate cursor-pointer'>
                                    Încarcă poza
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={() => deletePhoto(index)}
                                className='bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer flex-shrink-0'
                                aria-label={`Delete photo ${index + 1}`}
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button" // Adaugă acest atribut aici
                        onClick={addPhoto}
                        className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'
                    >
                        Add Photo
                    </button>

                </div>



                <div className="mt-7">
                    <button type="submit" className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">
                        Update Clinic Profile
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
