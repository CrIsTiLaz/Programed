'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/ClockLoader';
import Swal from 'sweetalert2';

function Signup() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: '',
        gender: 'other', // Default value for gender
        role: 'patient', // Default role set to 'patient'
    });

    const router = useRouter();

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setPreviewURL(data.url);
        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
    };

    const submitHandler = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log('body', res)

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Eroare la înregistrare');
            }

            Swal.fire({
                title: 'Success!',
                text: data.message || 'You have been registered successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setLoading(false);
            router.push('/login');
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Înregistrarea a eșuat!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setLoading(false);
        }
    };

    return (
        <section className='px-5 xl:px-0'>
            <div className='max-w-[1170px] mx-auto'>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className='hidden lg:block rounded-l-lg bg-primaryColor'>
                        <figure className='w-full h-full'>
                            <Image src='/signup/Add User.gif' width={400} height={400} className='w-full h-full object-cover rounded-l-lg' />
                        </figure>
                    </div>

                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                            Creează un <span className='text-primaryColor'>cont</span>
                        </h3>

                        <form onSubmit={submitHandler}>
                            <div className='mb-5'>
                                <input
                                    type='text'
                                    placeholder='Numele complet'
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className='mb-5'>
                                <input
                                    type='password'
                                    placeholder='Parola'
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                            </div>
                            <div className="mb-5 flex items-center justify-between">
                                <label className='text-headingColor font-bold text-[16px] leading-7'>
                                    Ești:
                                    <select name='role'
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                                        <option value="patient">Pacient</option>
                                    </select>
                                </label>
                                <label className='text-headingColor font-bold text-[16px] leading-7'>
                                    Genul (opțional):
                                    <select name='gender'
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
                                        <option value="other">Nespecificat</option>
                                        <option value="female">Femeie</option>
                                        <option value="male">Bărbat</option>
                                    </select>
                                </label>

                            </div>
                            <div className='mb-5 flex items-center gap-3'>
                                {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                                    <Image src={previewURL} alt={''} width={50} height={50} className='w-full rounded-full'></Image>
                                </figure>}
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
                                        Încarcă poza profil
                                    </label>
                                </div>
                            </div>
                            <div className='mt-7'>
                                <button disabled={loading} type='submit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                                    {loading ? <HashLoader size={35} color='#ffffff' /> : 'Înregistrează-te'}
                                </button>
                            </div>
                            <p className='mt-5 text-textColor text-center'>
                                Ai deja cont? <Link href="/login" className='text-primaryColor font-medium ml-1'>Autentificare</Link>
                            </p>
                            <p className='mt-5 text-textColor text-center'>
                                Ești un cabinet medical și dorești să te înregistrezi? <br />
                                <Link href="/clinic-register" className='text-primaryColor font-medium ml-1'>Înregistrează-te aici</Link>
                            </p>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;
