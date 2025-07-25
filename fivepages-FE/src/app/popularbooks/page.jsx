"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPopularBooks } from "../../services/api";

export default function PopularBooks() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getBooks = async () => {
      const result = await fetchPopularBooks();
      console.log(result)
      if (!result.error) {
        setBooks(result);
      } else {
        cosole.error("Error fetching books ", result.error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      <section className="p-6 bg-white">
        {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Popular Novels</h2>

          {/* <button onClick={() => router.push(`/novels/${book._id}`)}> */}

         {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-9  mt-10">
        {books.slice(0, 20).map((book) => (
          <div
            key={book._id}
            onClick={() => router.push(`/novels/${book._id}`)}
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
        {/* </div> */}
      </section>
    </>
  );
}
