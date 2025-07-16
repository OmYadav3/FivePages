"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const PopularBooks = React.memo(({ books = [] }) => {
  const router = useRouter();

  const handleClick = useCallback(
    (id) => {
      router.push(`/novels/${id}`);
    },
    [router]
  );

  if (books.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        No popular books found.
      </div>
    );
  }

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <span className="text-blue-600 text-4xl mr-2 leading-none">▌</span>
          Popular Books
        </h2>
        <button
          onClick={() => router.push("/popularbooks")}
          className="text-sm sm:text-base text-blue-600 font-semibold hover:underline"
        >
          See All →
        </button>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-9 ">
        {books.slice(0, 5).map((book) => (
          <div
            key={book._id}
            onClick={() => handleClick(book._id)}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            {/* Book Cover Image */}
            <img
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
            />

              {/* Soft Overlay with Details */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-gray-800 p-4 text-center">
                <h3 className="text-lg font-semibold line-clamp-2 mb-1">
                  {book.title}
                </h3>
                <p className="text-sm mb-2 text-gray-700">by {book.author}</p>
                <p className="text-sm mb-1 text-green-600 font-medium">
                  {book.views} Views
                </p>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {book.description}
                </p>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default PopularBooks;
