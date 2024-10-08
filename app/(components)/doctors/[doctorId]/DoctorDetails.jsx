"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ClinicsAbout from "../DoctorsAbout";
import Feedback from "../Feedback";
import SidePanel from "../SidePanel";
import { BASE_URL } from "@/app/config";
import useFetchData from "@/app/hooks/useFetchData";
import Loading from "@/app/loading";
import Error from "@/app/error/Error";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Services from "../Services";

// function usePathId() {
//     const [id, setId] = useState(null);

//     useEffect(() => {
//         // Această abordare funcționează doar pe client side
//         const pathSegments = window.location.pathname.split('/');
//         const idSegment = pathSegments[2]; // Asumând că URL-ul este /clinics/[id]
//         setId(idSegment);
//     }, []);

//     return id;
// }

function DoctorDetails() {
  const [tab, setTab] = useState("despre");

  // const id = usePathId();
  const params = useParams();
  const id = params.doctorId;
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(id ? `${BASE_URL}/doctors/${id}` : null);

  const {
    name = "",
    qualifications = [],
    reviews = [],
    bio = "",
    about = "",
    averageRating = 0,
    totalRating = 0,
    specialization = "",
    medicalGrade = "",
    ticketPrice = "",
    photo = "",
  } = doctor || {}; // Folosește un obiect gol ca fallback
  if (!doctor) return <div>Nu s-au putut încărca datele doctorului.</div>;
  if (loading) {
    return <Loading />;
  }
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loading />}
        {error && <Error errMessage={"erroarea"} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <div className="relative w-40 h-40 lg:w-60 lg:h-60">
                  {photo ? (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      src={photo}
                      alt="User profile photo"
                    />
                  ) : (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                      src="/header/user (4).png"
                      alt="Default profile photo"
                    />
                  )}
                </div>

                <div>
                  {/* Numele medicului */}
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>

                  {/* Rating-ul medicului */}
                  <div className="flex items-center gap-[6px] my-2">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <Image
                        src="/clinics/Star.png"
                        alt=""
                        width={20}
                        height={20}
                      />{" "}
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating} recenzii)
                    </span>
                  </div>

                  {/* Specializarea */}
                  <div className="my-3">
                    <span
                      className="bg-[#CCF0F3] text-irisBlueColor mt-3 py-1 px-3 lg:py-2 lg:px:6 text-[13px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded"
                    >
                      {specialization}
                    </span>
                  </div>

                  {/* Gradul medical */}
                  <div className="mt-5">
                    <span
                      className="bg-[#fff9ea]   text-yellowColor py-1 px-6 lg:py-2 lg:px:6 text-[13px] leading-4
            lg:text-[16px] lg:leading-7 font-semibold rounded"
                    >
                      Medic {medicalGrade}
                    </span>
                  </div>

                  {/* Bio, afișat sub toate celelalte informații */}
                  <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] mt-3">
                    {bio}
                  </p>
                </div>
              </div>
              <div className="mt-4 border-b border-solid border-[#0066ff34] flex flex-nowrap overflow-auto">
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
                  onClick={() => setTab("servicii")}
                  className={`py-2 px-3 sm:px-5 mr-2 sm:mr-5 text-[14px] sm:text-[16px] leading-7 text-headingColor font-semibold ${
                    tab === "servicii" &&
                    "border-b-4 border-solid border-primaryColor"
                  }`}
                >
                  Servicii
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`py-2 px-3 sm:px-5 mr-2 sm:mr-5 text-[14px] sm:text-[16px] leading-7 text-headingColor font-semibold ${
                    tab === "feedback" &&
                    "border-b-4 border-solid border-primaryColor"
                  }`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "despre" && (
                  <ClinicsAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                  />
                )}
                {tab === "servicii" && <Services doctorId={id} />}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>
            <div>
              <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorDetails;
