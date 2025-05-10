"use client";
import { useRouter } from "next/navigation";
import React,{ useCallback } from "react";

// Memoize the NewReleases component to prevent unnecessary re-renders
const NewReleases = React.memo(({ books }) => {
  const router = useRouter();

  // Memoize the click handler to prevent unnecessary re-creations
  const handleClick = useCallback((id) => {
    router.push(`/novels/${id}`);
  }, [router]);

  return (

    <section className="p-4 sm:p-6 bg-white">
      <div className="flex justify-between items-center flex-wrap gap-2">

        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-blue-600 text-3xl mr-2">▌</span> New Releases
        </h2>
        <button
          onClick={() => router.push("/new-releases-page")}
          className="text-blue-600 font-semibold text-sm hover:underline"
        >
          See More →
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {books.slice(0, 5).map((book, index) => (
          <div key={index} className="text-center shadow-lg rounded-lg p-3 bg-gray-50 hover:shadow-md transition-shadow">
            {/* Clickable image */}
            <button onClick={() => router.push(`/novels/${book._id}`)}>
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
              />
            </button>
            <h3 className="text-md font-semibold mt-2 line-clamp-2">{book.title}</h3>

            <p className="text-sm text-gray-500">By: {book.author}</p>
            <p className="text-green-600 font-bold text-sm">{book.views} Views</p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default NewReleases;
