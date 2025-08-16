import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./swiper-theme.css"; // custom theme overrides

export default function MaroonSwiper() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="bg-red-200 h-40 flex items-center justify-center text-lg font-bold">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-blue-200 h-40 flex items-center justify-center text-lg font-bold">
            Slide 2
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Arrows */}
      <button
        className="custom-prev absolute top-1/2 left-3 z-10 -translate-y-1/2
                   bg-[#7d2122] hover:bg-[#9e2a2b] text-white p-3 rounded-full shadow-lg"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        className="custom-next absolute top-1/2 right-3 z-10 -translate-y-1/2
                   bg-[#7d2122] hover:bg-[#9e2a2b] text-white p-3 rounded-full shadow-lg"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}
