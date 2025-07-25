"use client";

import { useParams } from "next/navigation";
import useSearchResults from "@/hooks/useSearchResults";
import Link from "next/link";

export default function SearchPage() {
  const { param } = useParams();
 const { query, results, loading } = useSearchResults(param);


  return (
    <div className="p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Search results for “{query}”</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : results.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
          {results.map((novel) => (
            <li key={novel._id} className="border rounded-md p-2 shadow hover:shadow-md transition bg-white">
              <Link href={`/novels/${novel._id}`}>
                <img
                  src={novel.thumbnail || "/default-cover.jpg"}
                  alt={novel.title || "Novel Cover"}
                  className="w-full object-cover rounded"
                />
                <h2 className="mt-3 font-semibold text-lg truncate">{novel.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No novels found for “{query}”.</p>
      )}
    </div>
  );
}
