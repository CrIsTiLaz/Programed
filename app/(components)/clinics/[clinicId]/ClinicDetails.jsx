"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import ClinicsAbout from '../DoctorsAbout';
import Feedback from "../Feedback";
import { BASE_URL } from "@/app/config";
import useFetchData from "@/app/hooks/useFetchData";
import Loading from "@/app/loading";
import Error from "@/app/error/Error";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ClinicsAbout from "../ClinicsAbout";
import Page from "../Swipe";
import ClinicCarousel from "../ClinicCarousel";
import { FaLocationDot } from "react-icons/fa6";
import DoctorList from "../../doctors/DoctorList";
import Doctors from "../../doctors/Doctors";

function ClinicDetails() {
  const [tab, setTab] = useState("servicii");
  const params = useParams();
  const id = params.clinicId;
  const {
    data: clinic,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/clinics/${id}`);
  const [allReviews, setAllReviews] = useState([]);
  let totalRatingsSum = 0;
  let totalAverageRatingSum = 0;
  let doctorCount = 0;
  useEffect(() => {
    if (clinic && clinic.doctors) {
      const reviews = clinic.doctors.reduce((acc, doctor) => {
        return acc.concat(doctor.reviews || []);
      }, []);
      setAllReviews(reviews);
    }
  }, [clinic]);

  if (clinic.doctors && Array.isArray(clinic.doctors)) {
    clinic.doctors.forEach((doctor) => {
      // Asigură-te că avgRating este tratat ca un număr
      const averageRating = parseFloat(doctor.averageRating);
      const totalRating = parseInt(doctor.totalRating, 10); // Convertim și totalRating, pentru siguranță

      totalRatingsSum += totalRating;
      totalAverageRatingSum += averageRating; // Adăugăm avgRating ca număr
      doctorCount++;
    });
  }

  // Calculul mediei averageRating, asigurându-ne că doctorCount nu este 0
  const averageRating =
    doctorCount > 0 ? (totalAverageRatingSum / doctorCount).toFixed(1) : "N/A";
  const {
    name,
    totalRating,
    specialization,
    address,
    phone,
    email,
    services,
    openingHours,
    description,
  } = clinic || {};

  if (!clinic) return <div>Nu s-au putut încărca datele clinicii.</div>;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />}
        {error && <Error errMessage={"Erroare"} />}

        {!loading && !error && (
          <>
            {/* Detalii clinica și carusel imagini */}
            {/* <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1'> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5 ">
              <ClinicCarousel photos={clinic.photos} />

              <div className="">
                {" "}
                {/* Ajustează lățimea după nevoie */}
                <h3 className="text-headingColor text-[22px] leading-9 font-bold">
                  {name}
                </h3>
                {/* <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'> */}
                <div className="my-3">
                  <span
                    className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 sm:text-[20px] leading-4
                          lg:text-[20px] lg:leading-7 font-semibold rounded "
                  >
                    {specialization}
                  </span>
                </div>
                <div className="mt-10 md:mt-[230px]">
                  <div className="flex items-center gap-[6px] my-2">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[20px] lg:leading-7 font-semibold text-headingColor">
                      <Image
                        src="/clinics/Star.png"
                        alt=""
                        width={20}
                        height={20}
                      />{" "}
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[20px] lg:leading-7 font-[400] text-textColor">
                      ({totalRatingsSum})
                    </span>
                  </div>{" "}
                  {/* sau orice valoare de marjă dorești */}
                  <div className="flex items-center lg:text-[20px]">
                    <FaLocationDot className="inline-block" />
                    <span className="inline-block ml-2">{address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab buttons */}
            {/* Tab buttons */}
            {/* Tab buttons */}
            <div className="mt-4 border-b border-solid border-[#0066ff34] flex flex-nowrap overflow-auto">
              <button
                onClick={() => setTab("servicii")}
                className={`py-2 px-3 sm:px-5 mr-2 sm:mr-5 text-[14px] sm:text-[16px] leading-7 text-headingColor font-semibold ${
                  tab === "servicii" &&
                  "border-b-4 border-solid border-primaryColor"
                }`}
              >
                Servicii
              </button>
              <button
                onClick={() => setTab("despre")}
                className={`py-2 px-3 sm:px-5 mr-2 sm:mr-5 text-[14px] sm:text-[16px] leading-7 text-headingColor font-semibold ${
                  tab === "despre" &&
                  "border-b-4 border-solid border-primaryColor"
                }`}
              >
                Despre
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`py-2 px-3 sm:px-5 mr-2 sm:mr-5 text-[14px] sm:text-[16px] leading-7 text-headingColor font-semibold ${
                  tab === "feedback" &&
                  "border-b-4 border-solid border-primaryColor"
                }`}
              >
                Recenzii
              </button>
            </div>

            {/* Content based on selected tab */}
            <div className="mt-3">
              {tab === "servicii" && <Doctors clinicId={id} />}
              {tab === "despre" && (
                <ClinicsAbout
                  name={name}
                  address={address}
                  email={email}
                  services={services}
                  openingHours={openingHours}
                  description={description}
                />
              )}
              {tab === "feedback" && (
                <Feedback reviews={allReviews} totalReviews={totalRatingsSum} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ClinicDetails;
