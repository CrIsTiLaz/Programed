import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import uploadImageToCloudinary from '@/app/utils/uploadCloudinary';
import { BASE_URL, token } from '@/app/config';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from 'react-icons/ai';
import { format } from 'date-fns';
import specializations from '@/Shared/specializations';

function Profile({ clinicData }) {
    const [formData, setFormData] = useState({
        name: clinicData?.name || '',
        email: clinicData?.email || '',
        phone: clinicData?.phone || '',
        address: clinicData?.address || '',
        city: clinicData?.city || 'Timisoara', // Inițializat cu Timisoara
        specialization: clinicData?.specialization || '',
        description: clinicData?.description || '',
        services: clinicData?.services || [],
        photos: clinicData?.photos || [],
        openingHours: clinicData?.openingHours || []
    });
    const [openingHours, setOpeningHours] = useState(clinicData.openingHours || [
        { dayOfWeek: 'Luni', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Marti', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Miercuri', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Joi', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Vineri', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Sambata', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Duminica', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        // Repetă pentru fiecare zi a săptămânii
    ]);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [currentToken, setCurrentToken] = useState('');

    useEffect(() => {
        const currentToken = localStorage.getItem('token');
        setCurrentToken(currentToken);
    }, []);

    const updateProfileHandler = async e => {
        e.preventDefault();
        const payload = {
            ...formData,
            openingHours: openingHours
        };
        // console.log("Sending payload to server:", payload);

        try {
            const response = await fetch(`${BASE_URL}/clinics/${clinicData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Profilul clinicii a fost actualizat cu succes.',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        } catch (error) {
            console.error("Eroare! A apărut o problemă la actualizarea profilului:", error);
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
                Informații Profil Clinică
            </h2>

            <form onSubmit={updateProfileHandler}>
                <div className="mb-5">
                    <label className="form__label">Nume Clinică</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form__input" required />
                </div>
                <div className="mb-5">
                    <label className="form__label">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form__input" required readOnly />
                </div>
                <div className="mb-5">
                    <label className="form__label">Telefon</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form__input" />
                </div>
                <div className="mb-5">
                    <label className="form__label">Adresă</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form__input" />
                </div>
                <div className="mb-5">
                    <label className="form__label">Oraș</label>
                    <select name="city" value={formData.city} onChange={handleInputChange} className="form__input">
                        <option value="Timisoara">Timișoara</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="form__label">Specializare</label>
                    <select name="specialization" value={formData.specialization} onChange={handleInputChange} className="form__input">
                        {specializations.map((specialization, index) => (
                            <option key={index} value={specialization}>
                                {specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-5">
                    <label className="form__label">Descriere</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} className="form__input" rows="4"></textarea>
                </div>
                <div className="mb-5">
                    <h3>Orar de lucru</h3>
                    {['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'].map((dayOfWeek) => {
                        // Găsește indexul zilei curente în array-ul workSchedule sau -1 dacă nu este prezentă
                        const index = openingHours.findIndex(schedule => schedule.dayOfWeek === dayOfWeek);

                        // Funcția de actualizare pentru startTime și endTime
                        const handleScheduleChange = (field, value) => {
                            // Creează un obiect Date din valoarea de timp primită
                            const timeValue = value ? new Date(`1970-01-01T${value}:00`) : null;

                            // Actualizează workSchedule cu noua valoare
                            setOpeningHours(currentSchedule => {
                                let newSchedule = [...currentSchedule];
                                if (index !== -1) {
                                    // Actualizăm ziua existentă
                                    newSchedule[index] = { ...newSchedule[index], [field]: timeValue };
                                } else {
                                    // Adăugăm o nouă zi în program
                                    newSchedule = [...newSchedule, { dayOfWeek, [field]: timeValue, consultationDuration: 30 }]; // Presupunem durată standard pentru noile zile
                                }
                                return newSchedule;
                            });
                        };

                        return (
                            <div key={dayOfWeek} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <label>{dayOfWeek}</label>
                                <div className="flex items-center">
                                    <input
                                        type="time"
                                        className='form__input'
                                        value={index !== -1 && openingHours[index].startTime ? format(openingHours[index].startTime, 'HH:mm') : ''}
                                        onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                                    />
                                    <span className="mx-2">la</span>
                                    <input
                                        type="time"
                                        className='form__input'
                                        value={index !== -1 && openingHours[index].endTime ? format(openingHours[index].endTime, 'HH:mm') : ''}
                                        onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mb-5">
                    <p className='form__label'>Fotografii</p>
                    {formData.photos.map((photo, index) => (
                        <div key={index} className='mb-5 flex items-center'>
                            {photo && (
                                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center mr-2'>
                                    <img src={photo} alt={`Photo ${index + 1}`} width={50} height={50} />
                                </figure>
                            )}
                            <div className='relative w-[130px] h-[50px] mr-10'>
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
                                    Încarcă fotografie
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
                        Adaugă fotografie
                    </button>

                </div>



                <div className="mt-7">
                    <button type="submit" className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">
                        Actualizează profilul clinicii
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
