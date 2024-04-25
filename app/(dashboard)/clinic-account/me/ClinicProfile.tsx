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
        photos: clinicData?.photos || [] // Schimbă numele câmpului de la 'photo' la 'photos' și initializează-l ca un array
    });

    const [services, setServices] = useState(clinicData.services || []);
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        if (clinicData) {
            setFormData(prev => ({ ...prev, ...clinicData }));
        }
    }, [clinicData]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const data = await uploadImageToCloudinary(file);
            if (data?.url) {
                console.log("URL from Cloudinary:", data.url); // Verifică URL-ul primit
                setFormData(prevFormData => ({
                    ...prevFormData,
                    photos: [...prevFormData.photos, data.url] // Adaugă URL-ul nou în array-ul de photos
                }));
            } else {
                console.log("Failed to receive URL from Cloudinary");
            }
        }
    };


    const updateProfileHandler = async e => {
        e.preventDefault();
        const payload = { ...formData };

        console.log("Sending payload to server with 'photos' array:", payload); // Verifică structura payload-ului înainte de a-l trimite

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
            console.log("Error updating profile:", error);
            Swal.fire({
                title: 'Error!',
                text: error.toString(),
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    const addQualification = e => {
        e.preventDefault();


    }
    const deleteQualification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault()

    }
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
                <div className='mb-5'>
                    <div className='relative w-full'>
                        <input
                            type='file'
                            name='photo'
                            id='photoUpload'
                            onChange={handleFileInputChange}
                            accept='.jpg, .png'
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        />
                        <label htmlFor='photoUpload' className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                            Upload Photo
                        </label>
                    </div>

                    {formData.photo && (
                        <div className='flex items-center gap-3 mt-3'>
                            <Image src={formData.photo} alt="Uploaded clinic photo" width={60} height={60} layout="responsive" className='rounded-full' />
                        </div>
                    )}
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
