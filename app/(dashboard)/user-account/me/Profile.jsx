"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import uploadImageToCloudinary from "@/app/utils/uploadCloudinary";
import { BASE_URL, token } from "@/app/config";

function Profile({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setCurrentToken(currentToken);
  }, []);

  const showAlert = () => {
    Swal.fire({
      title: "Alert!",
      text: "This is a sweet alert!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
  });

  const router = useRouter();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Eroare la înregistrare");
      }

      // Dacă înregistrarea este un succes, afișează un Sweet Alert de succes
      Swal.fire({
        title: "Success!",
        text: data.message || "You have been registered successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setLoading(false);
      router.push("/user-account/me");
    } catch (err) {
      // Dacă înregistrarea eșuează, afișează un Sweet Alert de eșec
      Swal.fire({
        title: "Error!",
        text: err.message || "Înregistrarea a eșuat!",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Numele complet"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            required
          />
        </div>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Parola"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
          />
        </div>

        {/* <div className='mb-5'>
                    <input
                        type='text'
                        placeholder='Blood Type'
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                        text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer'
                    />
                </div> */}

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Genul:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Selectează</option>
              <option value="female">Femeie</option>
              <option value="male">Bărbat</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <Image
                src={formData.photo}
                alt={""}
                width={50}
                height={50}
                className="w-full rounded-full"
              ></Image>
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-50 h-full flex items-center px-[0.75rem] 
                                py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg
                                truncate cursor-pointer z-10"
            >
              {selectedFile ? selectedFile.name : "Incarca poza"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? (
              <ClipLoader size={25} color="#ffffff" />
            ) : (
              "Actualizează profilul"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
