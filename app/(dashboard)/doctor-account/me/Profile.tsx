import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import Image from 'next/image';
import uploadImageToCloudinary from '@/app/utils/uploadCloudinary';
import { BASE_URL, token } from '@/app/config';
import Swal from 'sweetalert2';
import Time from '@/app/(components)/clinics/Time';
import { format } from 'date-fns';

function Profile({ doctorData }) {

    const [workSchedule, setWorkSchedule] = useState(doctorData.workSchedule || [
        { dayOfWeek: 'Luni', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Marti', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Miercuri', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Joi', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Vineri', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Sambata', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        { dayOfWeek: 'Duminica', startTime: '', endTime: '', consultationDuration: 30 }, // durata implicită poate varia
        // Repetă pentru fiecare zi a săptămânii
    ]);
    const [services, setServices] = useState(doctorData.services || []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        medicalGrade: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null,
        workSchedule: doctorData.workSchedule || [],
        // photo: '/clinics/doctor-img01.png'
    })
    const [selectedHour, setSelectedHour] = useState(null);
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const [generalConsultationDuration, setGeneralConsultationDuration] = useState(30);
    // console.log('doctorData', doctorData)
    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            medicalGrade: doctorData?.medicalGrade,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualification || [],
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo,

        })
    }, [doctorData])
    useEffect(() => {
        console.log(generalConsultationDuration);
    }, [generalConsultationDuration]);
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

        // Construiește partea de workSchedule a payload-ului
        const updatedWorkSchedule = workSchedule.map(schedule => ({
            ...schedule,
            consultationDuration: generalConsultationDuration,
            startTime: schedule.startTime ? new Date(schedule.startTime).toISOString() : null,
            endTime: schedule.endTime ? new Date(schedule.endTime).toISOString() : null,
            consultation: `Consultație generala: ${generalConsultationDuration} minute` // Exemplu de valoare adăugată
        }));

        // Construiește filteredFormData, similar cu cum ai făcut anterior
        const filteredFormData = Object.entries(formData).reduce((acc, [key, value]) => {
            // Filtrează câmpurile neutilizate, exact cum ai făcut înainte
            const isEmptyArray = Array.isArray(value) && value.length === 0;
            if (value !== null && value !== '' && !isEmptyArray) {
                acc[key] = value;
            } else if (Array.isArray(value)) {
                acc[key] = value;
            }
            return acc;
        }, {});

        // Îmbină updatedWorkSchedule în filteredFormData
        const payload = {
            ...filteredFormData,
            services,
            workSchedule: updatedWorkSchedule,
            medicalGrade: formData.medicalGrade, // Adaugă acest rând
        };
        console.log("Payload being sent:", JSON.stringify(payload, null, 2));

        try {
            const response = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
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

            //sweet alert de succes
            Swal.fire({
                title: 'Success!',
                text: 'Your profile has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        } catch (error) {
            //sweet alert de eroare
            Swal.fire({
                title: 'Error!',
                text: error.toString(),
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };




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

    const addTimeSlot = (e) => {
        e.preventDefault();

        // Inițializează 'day' cu ziua curentă
        const newSlot = {
            day: currentDate, // Folosește variabila definită anterior
            time: '' // Aici presupunem că 'time' va fi setat mai târziu de utilizator
        };

        addItem('timeSlots', newSlot);
    };



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

    const handleWorkScheduleChange = (dayOfWeek, field, value) => {
        // Găsirea indexului elementului pe baza zilei săptămânii
        const index = workSchedule.findIndex(schedule => schedule.dayOfWeek === dayOfWeek);

        if (index !== -1) {
            // Construim o nouă valoare pentru startTime sau endTime
            let newValue = value;
            if (field === 'startTime' || field === 'endTime') {
                let [hours, minutes] = value.split(':');
                newValue = new Date();
                newValue.setHours(hours, minutes, 0);
            }

            // Actualizăm workSchedule într-un mod imutabil
            const newWorkSchedule = [...workSchedule];
            newWorkSchedule[index] = { ...newWorkSchedule[index], [field]: newValue };

            setWorkSchedule(newWorkSchedule);
        }
    };

    const addService = (e) => {
        e.preventDefault();

        const newService = { name: '', price: '' }; // Inițializați un nou serviciu
        setServices([...services, newService]); // Adăugați noul serviciu la array
    };

    const updateService = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const deleteService = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
    };



    const updatedWorkSchedule = workSchedule.map(schedule => ({
        ...schedule,
        consultationDuration: generalConsultationDuration || schedule.consultationDuration
    }));


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
                        value={formData.name || ''}
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
                        disabled={true}
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
                        value={formData.bio || ''}
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
                            <p className='form__label'>Grad medical*</p>
                            <select
                                name='medicalGrade'
                                value={formData.medicalGrade}
                                onChange={handleInputChange}
                                className='form__input py-3.5'>
                                <option value=''>Selectează</option>
                                <option value='primar'>Medic primar</option>
                                <option value='specialist'>Medic specialist</option>
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
                                            value={item.position || ''}
                                            className='form__input'
                                            onChange={e => handleExperienceChange(e, index)}
                                        />
                                    </div>

                                    <div>
                                        <p className='form__label'>Hospital*</p>
                                        <input
                                            type="text"
                                            name='hospital'
                                            value={item.hospital || ''}
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
                        <div key={index} className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                            <div>
                                <p className='form__label'>Day*</p>
                                <input
                                    name='day'
                                    value={item.day}
                                    className='form__input py-3.5'
                                    onChange={e => handleTimeSlotChange(e, index)}
                                    type='date'
                                />
                            </div>

                            <div>
                                <p className='form__label'>Time*</p>
                                {/* Verifică dacă slotul are o oră setată */}
                                {item.time ? (
                                    <input
                                        name='time'
                                        value={item.time}
                                        className='form__input py-3.5'
                                        readOnly
                                    />
                                ) : (
                                    // Dacă nu, afișează componenta Time pentru a selecta o oră
                                    <Time
                                        selectedDate={new Date(item.day)}
                                        doctorId={doctorData._id}
                                        onHourSelect={(hour) => handleTimeSlotChange(
                                            { target: { name: 'time', value: `${hour}` } }, index
                                        )}
                                    />
                                )}
                            </div>

                            <div onClick={e => deleteTimeSlot(e, index)} className='flex items-center justify-center'>
                                <button className='btn bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer'>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addTimeSlot} className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>Add Time Slot</button>
                </div>

                <div className="mb-5">
                    <h3>Orar de lucru</h3>
                    {['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'].map((dayOfWeek) => {
                        // Găsește indexul zilei curente în array-ul workSchedule sau -1 dacă nu este prezentă
                        const index = workSchedule.findIndex(schedule => schedule.dayOfWeek === dayOfWeek);

                        // Funcția de actualizare pentru startTime și endTime
                        const handleScheduleChange = (field, value) => {
                            // Creează un obiect Date din valoarea de timp primită
                            const timeValue = value ? new Date(`1970-01-01T${value}:00`) : null;

                            // Actualizează workSchedule cu noua valoare
                            setWorkSchedule(currentSchedule => {
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
                                        value={index !== -1 && workSchedule[index].startTime ? format(workSchedule[index].startTime, 'HH:mm') : ''}
                                        onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                                    />
                                    <span className="mx-2">la</span>
                                    <input
                                        type="time"
                                        className='form__input'
                                        value={index !== -1 && workSchedule[index].endTime ? format(workSchedule[index].endTime, 'HH:mm') : ''}
                                        onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <div>
                        <label>Durata consultației (minute)</label>
                        <input
                            type="number"
                            id="consultationDuration"
                            name="generalConsultationDuration"
                            className='form__input'
                            value={generalConsultationDuration}
                            onChange={e => setGeneralConsultationDuration(Number(e.target.value))}
                            min="1" // Asigură-te că durata este pozitivă
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <p className='form__label'>Services*</p>
                    {services.map((service, index) => (
                        <div key={index} className='grid grid-cols-2 gap-5 mb-[30px]'>
                            <input
                                type="text"
                                placeholder="Nume Serviciu"
                                value={service.name}
                                className='form__input py-3.5 w-full'
                                onChange={(e) => updateService(index, 'name', e.target.value)}
                            />
                            <div className="flex flex-row items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Preț"
                                    value={service.price}
                                    className='form__input py-3.5 w-full'
                                    onChange={(e) => updateService(index, 'price', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => deleteService(index)}
                                    className='bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer flex-shrink-0'
                                    aria-label={`Delete service ${index + 1}`}
                                >
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addService}
                        className='btn bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'
                    >
                        Add Service
                    </button>
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