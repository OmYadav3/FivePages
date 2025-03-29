"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Select } from "@headlessui/react";

export default function ChapterPage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Extract the correct novel ID

  const [chapters, setChapters] = useState(); // Store an array of chapters
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);

    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/chapters/${id}`
        );

        const data = await response.json();
        console.log("API Response:", data); // Debug log

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch chapters data.");

        setChapters(data); // Store the array of chapters
        // console.log(data.content);
        data.content = data.content.replace(/\n/g, "<br>");
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    if (id) fetchChapters();
  }, [id]);

  if (!isAuthenticated) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        Redirecting to login...
      </p>
    );
  }

  if (!chapters) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        No chapters found
      </p>
    );
  }

  return (
    <div className="my-10 px-12 py-18 max-w-3xl mx-auto bg-white shadow-md rounded-lg border border-gray-200   ">
      <h1 className="text-4xl font-bold text-center content-container ">
        Chapter 1
      </h1>
      <h2 className="text-center content-container text-3xl font-bold text-gray-800 mt-4 select-none">
        {chapters.title}
      </h2>
      <p
        className="content-container mt-6 text-lg text-gray-700 select-none "
        dangerouslySetInnerHTML={{ __html: chapters.content }}
      />

      {/* Navigation */}
      <div className="flex justify-between my-6">
        {chapters.id > 1 ? (
          <Link
            href={`/chapter/${chapter.id - 1}`}
            className="px-4 py-2 bg-[#E3E8F0] rounded-lg hover:bg-[#D4DBE8] transition "
          >
            &larr; Prev
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-200 rounded-lg opacity-50 pointer-events-none">
            &larr; Prev
          </span>
        )}

        {chapters.id < chapters.length ? (
          <Link
            href={`/chapters/${chapter.id + 1}`}
            className="px-4 py-2 bg-[#E3E8F0] rounded-lg hover:bg-[#D4DBE8] transition"
          >
            Next &rarr;
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-200 rounded-lg opacity-50 pointer-events-none ">
            Next &rarr;
          </span>
        )}
      </div>

      {/* Recommended Novels */}
      {/* <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          📖 Recommended Novels
        </h3>
        <ul className="mt-4 space-y-2">
          {recommendedNovels.map((novel) => (
            <li
              key={novel.id}
              className="text-[#4A90E2] cursor-pointer hover:underline"
            >
              <Link href={`/novel/${novel.id}`}>{novel.title}</Link>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Comments Section */}
      {/* <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          💬 Comments
        </h3>
        <div className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            placeholder="Leave a comment..."
          />
          <button
            onClick={addComment}
            className="bg-[#A3BCE2] text-white px-4 py-2 rounded-lg hover:bg-[#8FA8D1] transition"
          >
            Post Comment
          </button>
        </div>

        {comments.length > 0 && (
          <ul className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="border-b p-2 bg-[#F7F7F7] rounded-lg">
                {comment}
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
}
