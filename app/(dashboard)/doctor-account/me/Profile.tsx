import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import Image from 'next/image';
import uploadImageToCloudinary from '@/app/utils/uploadCloudinary';
import { BASE_URL, token } from '@/app/config';
import Swal from 'sweetalert2';
import Time from '@/app/(components)/clinics/Time';

function Profile({ doctorData }) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null
        // photo: '/clinics/doctor-img01.png'
    })
    const [selectedHour, setSelectedHour] = useState(null);

    console.log('doctorData', doctorData)
    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualification || [],
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo,

        })
    }, [doctorData])

    const handleInputChange = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileInputChange = async event => {

        const file = event.target.files[0]
        const data = await uploadImageToCloudinary(file);

        // console.log('data', data)
        setFormData({ ...formData, photo: data?.url })

    }

    const updateProfileHandler = async e => {
        e.preventDefault();

        // Filtrăm formData pentru a exclude câmpurile care nu au fost completate
        const filteredFormData = Object.entries(formData).reduce((acc, [key, value]) => {
            // Verificăm dacă valoarea este un array și dacă este gol
            const isEmptyArray = Array.isArray(value) && value.length === 0;

            // Adăugăm în acc doar valorile care nu sunt null, șiruri goale, sau array-uri goale
            // Ajustează condiția în funcție de nevoile tale
            if (value !== null && value !== '' && !isEmptyArray) {
                acc[key] = value;
            } else if (Array.isArray(value)) {
                // Dacă vrei să incluzi array-uri indiferent de conținutul lor, comentează linia de mai sus și decomentează această linie
                acc[key] = value;
            }
            return acc;
        }, {});

        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(filteredFormData)
            })

            const result = await res.json()
            if (!res.ok) {
                throw Error(result.message)
            }

            //sweet alert de success
            Swal.fire({
                title: 'Succes!',
                text: 'Profilul a fost actualizat cu succes.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })




        } catch (err) {
            //sweet alert de error
            Swal.fire({
                title: 'Eroare!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }



    //reusable function for adding item
    const addItem = (key: string, item: { startingDate?: string; endingDate?: string; degree?: string; university?: string; position?: string; hospital?: string; day?: string; startingTime?: string; endingTime?: string; }) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }

    // reusable input change function
    const handleReusableInputChangeFunc = (key: string, index: any, event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target

        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]

            updateItems[index][name] = value

            return {
                ...prevFormData,
                [key]: updateItems,
            };
        });
    };

    //reusable function for deleting items
    const deleteItem = (key: string, index: any) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: prevFormData[key].filter((_: any, i: any) => i !== index) }))
    }

    const addQualification = e => {
        e.preventDefault();

        addItem('qualifications', {
            startingDate: '', endingDate: '', degree: 'PHD', university: 'Dkacka'
        })
    }

    const handleQualificationChange = (event: { target: { name: any; value: any; }; }, index: any) => {
        handleReusableInputChangeFunc('qualifications', index, event)
    }

    const deleteQualification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault()
        deleteItem('qualifications', index)
    }

    const addExperience = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        addItem('experiences', {
            startingDate: '', endingDate: '', position: 'Senior Surgeon', hospital: 'Judeten'
        })
    }

    const handleExperienceChange = (event: { target: { name: any; value: any; }; }, index: any) => {
        handleReusableInputChangeFunc('experiences', index, event)
    }

    const deleteExperience = (e: { preventDefault: () => void; }, index: any) => {
        e.preventDefault()
        deleteItem('experiences', index)
    }

    const addTimeSlot = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        addItem('timeSlots', { day: 'Sunday', startingTime: '10:00', endingTime: '04:30' },)
    }

    const handleTimeSlotChange = (event: { target: { name: any; value: any; }; }, index: any) => {
        handleReusableInputChangeFunc('timeSlots', index, event)
    }

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        console.log(`Data selectată: ${selectedDate}, Ora selectată: ${hour}:00`);
    };

    const deleteTimeSlot = (e: { preventDefault: () => void; }, index: any) => {
        e.preventDefault()
        deleteItem('timeSlots', index)
    }
    // console.log('formData.photo', formData.photo)


    return (
        <div>
            <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
                Profile Information
            </h2>

            <form>
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Full Name'
                        className='form__input'
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                        className='form__input'
                        readOnly
                        aria-readonly
                        disabled='true'
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input
                        type='number'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Phone number'
                        className='form__input'
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input
                        type='text'
                        name='bio'
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder='Bio'
                        className='form__input'
                        maxLength={100}
                    />
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className='form__label'>
                                Gender*
                            </p>
                            <select name='gender' value={formData.gender} onChange={handleInputChange}
                                className='form__input py-3.5'>
                                <option value=''>Select</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Other</option>



                            </select>
                        </div>

                        <div>
                            <p className='form__label'>
                                Specialization*
                            </p>
                            <select name='specialization' value={formData.specialization} onChange={handleInputChange}
                                className='form__input py-3.5'>
                                <option value=''>Select</option>
                                <option value='surgeon'>Surgeon</option>
                                <option value='neurologist'>Neurologist</option>
                                <option value='dermatologist'>Dermatologist</option>
                                <option value='dentist'>Dentist</option>



                            </select>
                        </div>

                        <div>
                            <p className='form__label'>Ticket price *</p>
                            <input
                                type='number'
                                placeholder='100'
                                name='ticketPrice'
                                value={formData.ticketPrice}
                                className='form__input'
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

                <div className='mb-5'>
                    <p className='form__label'>Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <p className='form__label'>Starting Date*</p>
                                        <input
                                            type="date"
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form__input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form__label'>Ending Date*</p>
                                        <input
                                            type="date"
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form__input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div>
                                        <p className='form__label'>Degree*</p>
                                        <input
                                            type="text"
                                            name='degree'
                                            value={item.degree}
                                            className='form__input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form__label'>University*</p>
                                        <input
                                            type="text"
                                            name='university'
                                            value={item.university}
                                            className='form__input'
                                            onChange={e => handleQualificationChange(e, index)}
                                        />
                                    </div>
                                </div>


                                <button onClick={e => deleteQualification(e, index)} className='btn bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button onClick={addQualification} className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Qualification</button>
                </div>

                <div className='mb-5'>
                    <p className='form__label'>Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <p className='form__label'>Starting Date*</p>
                                        <input
                                            type="date"
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form__input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form__label'>Ending Date*</p>
                                        <input
                                            type="date"
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form__input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div>
                                        <p className='form__label'>Position*</p>
                                        <input
                                            type="text"
                                            name='position'
                                            value={item.position}
                                            className='form__input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form__label'>Hospital*</p>
                                        <input
                                            type="text"
                                            name='hospital'
                                            value={item.hospital}
                                            className='form__input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>


                                <button onClick={e => deleteExperience(e, index)} className='btn bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button onClick={addExperience} className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Experience</button>
                </div>

                <div className='mb-5'>
                    <p className='form__label'>Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                                    <div>
                                        <p className='form__label'>Day*</p>
                                        <input
                                            name='day'
                                            value={item.day}
                                            className='form__input py-3.5'
                                            onChange={e => handleTimeSlotChange(e, index)}
                                            type='date'
                                        >


                                        </input>
                                    </div>

                                    <div>
                                        <p className='form__label'>Ora*</p>
                                        <Time
                                            selectedDate={new Date(item.day)}
                                            doctorId={doctorData._id}
                                            onHourSelect={(hour) => console.log(`Ora selectată: ${hour}`)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form__label'>Ending Time*</p>
                                        <input
                                            type="time"
                                            name='endingTime'
                                            value={item.endingTime}
                                            className='form__input'
                                            onChange={e => handleTimeSlotChange(e, index)}
                                        />
                                    </div>

                                    <div onClick={e => deleteTimeSlot(e, index)} className='flex items-center'>
                                        <button className='btn bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6'>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={addTimeSlot} className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Time Slot</button>
                </div>

                <div className="mb-5">
                    <p className='form__label'>About*</p>

                    <textarea
                        name="about"
                        rows={5}
                        value={formData.about}
                        placeholder='Write about you'
                        onChange={handleInputChange}
                        className='form__input'></textarea>
                </div>

                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                        {/* <Image src={formData.photo} alt={''} width={50} height={50} className='w-full rounded-full'></Image> */}
                        {formData.photo ? <Image src={formData.photo} alt="" width={50} height={50} layout="responsive" /> : null}
                    </figure>
                    }
                    <div className='relative w-[130px] h-[50px]'>
                        <input
                            type='file'
                            name='photo'
                            id='customFile'
                            onChange={handleFileInputChange}
                            accept='.jpg, .png'
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        />

                        <label htmlFor='customFile' className='absolute top-0 left-0 w-50 h-full flex items-center px-[0.75rem] 
                                py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg
                                truncate cursor-pointer'>
                            Incarca poza profil
                        </label>
                    </div>
                </div>

                <div className="mt-7">
                    <button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>
                        Update profile
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile

//31:29