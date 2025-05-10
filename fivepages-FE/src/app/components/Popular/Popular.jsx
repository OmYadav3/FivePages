"use client";
import { useRouter } from "next/navigation";
import React,{ useCallback } from "react";

// Memoize PopularBooks component to avoid unnecessary re-renders
const PopularBooks = React.memo(({ books }) => {
  const router = useRouter();

  // Memoize the click handler to prevent unnecessary re-creations
  const handleClick = useCallback((id) => {
    router.push(`/novels/${id}`);
  }, [router]);

  return (
    <section className="p-4 sm:p-6 bg-white mb-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-blue-600 text-3xl mr-2">▌</span> Popular Books
        </h2>
        <button
          onClick={() => router.push("/popularbooks")}
          className="text-blue-600 font-semibold text-sm hover:underline"
        >
          See More →
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {books.slice(0, 6).map((book, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 bg-gray-50 rounded-lg p-3 shadow hover:shadow-md transition-shadow"
          >
            {/* Clickable image */}
            <button onClick={() => router.push(`/novels/${book._id}`)}>
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full sm:w-28 h-40 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
              />
            </button>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-md font-semibold line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-500">By: {book.author}</p>
              </div>
              <div>
                <p className="text-green-600 font-bold text-sm mt-1">
                  {book.views} Views
                </p>
                <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                  {book.description}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default PopularBooks;
