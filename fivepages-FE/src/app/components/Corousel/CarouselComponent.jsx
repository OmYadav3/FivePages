"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarouselComponent = ({ books }) => {
  const router = useRouter();

  if (!books || books.length === 0) {
    return <p className="text-xl text-center my-2">Loading images...</p>;
  }

  const handleClick = (id) => {
    router.push(`/novels/${id}`);
  };

  return (
    <div className="w-full my-4 bg-white p-4 rounded-lg shadow-md">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-lg"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index} className="p-2">
            <div
              onClick={() => handleClick(book._id)}
              className="cursor-pointer group"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-64 sm:h-72 md:h-80 lg:h-[70vh]  object-cover rounded-lg shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
              />
              <h3 className="text-center mt-2 font-semibold text-base sm:text-lg md:text-xl">
                {book.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;