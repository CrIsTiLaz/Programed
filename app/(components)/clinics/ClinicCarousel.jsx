import Image from "next/image";
import React from "react";
import { Pagination, Navigation, Autoplay, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ClinicCarousel({ photos, height }) {
  const images = [
    "/temp/cabinet1.jpg",
    "/temp/cabinet2.jpg",
    "/temp/cabinet3.jpg",
  ];

  if (!photos || photos.length === 0) {
    return <div>No photos available</div>; // Afisare mesaj sau fallback când nu sunt poze
  }

  return (
    <div>
      {/* Carusel pentru ecrane mici */}
      {/* <div className="block lg:hidden">
        <Swiper
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
          }}
          speed={800}
          loop={true}
          modules={[Pagination, Navigation, Scrollbar]}
          className="custom-swiper-container w-full rounded-lg"
        >
          {photos.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: "100%",
                  height: "150px",
                  position: "relative",
                }}
              >
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover"
                  src={imgSrc}
                  alt={`Clinic Slide ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

      {/* Carusel pentru ecrane mari */}
      <div>
        <Swiper
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
          }}
          speed={800}
          loop={true}
          modules={[Pagination, Navigation, Scrollbar]}
          className="custom-swiper-container w-full rounded-lg"
        >
          {photos.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: "100%",
                  height: height,
                  position: "relative",
                }}
              >
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover"
                  src={imgSrc}
                  alt={`Clinic Slide ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ClinicCarousel;
