import Image from "next/image";
import React from "react";
import {
  Pagination,
  Navigation,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import FormateDate from "@/app/utils/FormateDate";
import SwiperCore from "swiper";
import Swipe from "./Swipe";
import { FaLocationDot } from "react-icons/fa6";
import ClinicCarousel from "./ClinicCarousel";

function ClinicCard({ clinic }) {
  const { name, specialization, medicalGrade, photos, doctors } = clinic;
  let totalRatingsSum = 0;
  let totalAverageRatingSum = 0;
  let doctorCount = 0;

  if (doctors && Array.isArray(doctors)) {
    doctors.forEach((doctor) => {
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

  SwiperCore.use([Autoplay]);
  // Array cu imagini predefinite
  const images = [
    "/temp/cabinet1.jpg",
    "/temp/cabinet2.jpg",
    "/temp/cabinet3.jpg",
  ];

  return (
    <Link href={`/clinics/${clinic._id}`} className="block p-3 lg:p-5">
      {/* <Swiper
                navigation
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000
                }}
                speed={800}
                modules={[Pagination, Navigation, Scrollbar]}
                className="custom-swiper-container w-full rounded-lg">
                {images.map((imgSrc, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex items-center justify-center' style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full h-auto "
                                src={imgSrc}
                                alt={`Clinic Slide ${index + 1}`}
                            // className="w-full h-8" // optional
                            />
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper> */}
      <div className="block lg:hidden">
        <ClinicCarousel photos={photos} height="150px" />
      </div>
      <div className="hidden lg:block">
        <ClinicCarousel photos={photos} height="250px" />
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-1 gap-1 ">
        <div className="flex justify-between items-center">
          <h2 className="text-left text-[18px] lg:text-[24px] font-bold text-headingColor break-words overflow-hidden max-w-full sm:max-w-xs">
            {name}
          </h2>

          <div className="flex items-center gap-[6px] ">
            {" "}
            {/* Adjust the margin-top value as needed */}
            <Image src="/clinics/Star.png" alt="" width={20} height={20} />
            <span className="text-headingColor font-semibold">
              {averageRating}
            </span>
            <span className="text-rating">({totalRatingsSum})</span>{" "}
            {/* Afișarea sumei totale a ratingurilor */}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 text-[13px] lg:text-[20px] font-semibold rounded">
            {specialization}
          </span>
          {/* Alte elemente dacă există */}
        </div>
      </div>
    </Link>
  );
}

export default ClinicCard;
