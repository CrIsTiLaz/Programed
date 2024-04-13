import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import uploadImageToCloudinary from '@/app/utils/uploadCloudinary';
import { BASE_URL, token } from '@/app/config';
import Swal from 'sweetalert2';

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
        photo: clinicData?.photo || null
    });

    const [services, setServices] = useState(clinicData.services || []);

    useEffect(() => {
        if (clinicData) {
            setFormData(prev => ({ ...prev, ...clinicData }));
        }
    }, [clinicData]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileInputChange = async event => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData({ ...formData, photo: data?.url });
    };

    const updateProfileHandler = async e => {
        e.preventDefault();
        const payload = { ...formData };

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
            Swal.fire({
                title: 'Error!',
                text: error.toString(),
                icon: 'error',
                confirmButtonText: 'Ok',
            });
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
                    <label className="form__label">Upload Clinic Photo</label>
                    <input type="file" onChange={handleFileInputChange} accept="image/*" />
                    {formData.photo && <img src={formData.photo} alt="Clinic" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
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
