"use client";
import { useRouter } from "next/navigation";

const NewReleases = ({ books }) => {
  const router = useRouter();

  return (
  
    <section className="p-6 bg-white">
      <div className="flex justify-between items-center">
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

      <div className="grid grid-cols-5 gap-3 mt-6">
        {books.slice(0, 5).map((book, index) => (
          <div key={index} className="text-center shadow-lg rounded p-2" >
             {/* Clickable image */}
              <button onClick={() => router.push(`/novels/${book._id}`)}>
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-40 h-50 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                />
              </button>
            <h3 className="text-md font-semibold mt-2">{book.title}</h3>
            <p className="text-sm text-gray-500">By: {book.author}</p>
            <p className="text-green-600 font-bold text-sm">
              {book.views} Views
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
