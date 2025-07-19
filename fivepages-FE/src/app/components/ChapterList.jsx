"use client";
import Link from "next/link";

export default function ChapterList({ chapters }) {
  console.log(chapters)
  return (
    <div className="bg-white px-6 py-4 mt-4 rounded-xl shadow-md border border-gray-300 space-y-4 w-full max-w-2xl">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">Chapters</h2>
      <ul className="space-y-3">
        {chapters.map((chapter, index) => (
          <li
            key={chapter._id || index}
            className="flex sm:text-base text-sm sm:flex-row items-center flex-wrap"
          >
            <span className="mr-2 font-semibold text-gray-700">{index + 1}.</span>
            <Link
              href={`/chapters/${chapter._id}`}
              className="text-blue-600 hover:underline break-words"
            >
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
