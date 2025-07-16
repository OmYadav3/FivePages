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
    <div className="w-full my-8 bg-white p-4 rounded-lg shadow-md">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
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
          <SwiperSlide key={index} className="p-6">
            <div
              onClick={() => handleClick(book._id)}
              className="cursor-pointer group"
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-64 sm:h-72 md:h-80 lg:h-[74vh]  transition-opacity duration-300 group-hover:opacity-80 border rounded"
              />
              {/* Soft Overlay with Details */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-gray-800 p-4 text-center">
                <h3 className="text-3xl font-bold line-clamp-2 mb-1">
                  {book.title}
                </h3>
                <p className=" mb-2 text-gray-700 font-bold">
                  by {book.author}
                </p>
                <p className=" mb-1 text-green-600 font-bold">
                  {book.views} Views
                </p>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselComponent;
