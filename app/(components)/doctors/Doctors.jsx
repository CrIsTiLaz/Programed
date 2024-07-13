"use client"; // top to the file
import { doctors } from "@/Shared/doctors";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import ClinicCard from "./DoctorCard";
import Testimonial from "../(homepage)/testimonial/Testimonial";
import { BASE_URL } from "@/app/config";
import useFetchData from "@/app/hooks/useFetchData";
import Loading from "@/app/loading";
import Error from "@/app/error/Error";
import DoctorList from "./DoctorList";
import DoctorCard from "./DoctorCard";

function Doctors({ clinicId }) {
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?clinicId=${clinicId}`);
  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            appointmentDate={undefined}
            appointmentTime={undefined}
            isExpired={undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default Doctors;
