"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import "../../globals.css";
import { BookmarkCheck, BookOpen, Heart } from "lucide-react";
import CommentSection from "./../../components/CommentSection/CommentSection";
import RecommendedNovels from "../../components/RecommendedNovels/RecommendedNovels";

export default function NovelPage() {
  const router = useRouter();
  const { novelId } = useParams();

  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isInReadList, setIsInReadList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}novels/${novelId}`
        );
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch novel data.");

        setNovel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (novelId) fetchNovel();
  }, [novelId]);

  if (loading) return <p className="text-center text-xl">Loading novel...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const toggleReadList = () => {
    setIsInReadList(!isInReadList);
    alert(
      `${novel.title} ${isInReadList ? "removed from" : "added to"} Read List!`
    );
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    alert(
      `${novel.title} ${isLiked ? "removed from" : "added to"} Liked Novels!`
    );
  };

  const readNow = () => {
    const savedProgress = localStorage.getItem(`lastRead-${novelId}`);
    const chapterIdToRead = savedProgress || novel?.chapters?.[0]?._id;

    if (chapterIdToRead) {
      router.push(`/chapters/${chapterIdToRead}`);
    } else {
      console.error("No chapters available for this novel");
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    console.log("Posting comment:", newComment);
    alert("Comment posted!"); // Replace with actual logic later
    setNewComment("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4] p-4 sm:p-8">
      <div className="w-full max-w-4xl p-6 sm:p-10 bg-white shadow-md border border-gray-300 rounded-xl space-y-10">
        {/* Novel Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={novel.thumbnail}
            alt={novel.title}
            className="w-full md:w-44 h-64 object-cover rounded-lg border border-gray-300"
          />
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {novel.title}
            </h1>
            <p className="text-gray-600">
              <span className="font-semibold">Author:</span> {novel.author}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Language:</span> {novel.language}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Published Year:</span>{" "}
              {novel.publishedYear}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Type:</span> {novel.type}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Rating:</span> {novel.rating}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Chapters:</span>{" "}
              {novel.chapters?.length}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={readNow}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            <BookOpen /> Start Reading
          </button>
          <button
            onClick={toggleReadList}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition ${
              isInReadList
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <BookmarkCheck />{" "}
            {isInReadList ? "Added to Readlist" : "Add to Readlist"}
          </button>
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg transition"
          >
            <Heart color={isLiked ? "#bd0f0f" : "black"} />
            {isLiked ? "Liked" : "Like"}
          </button>
        </div>

        {/* Synopsis */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="text-gray-700">{novel.synopsis}</p>
        </div>

        {/* Chapters */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 space-y-4 w-full max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
            Chapters
          </h2>
          <ul className="space-y-3">
            {novel.chapters.map((chapter, index) => (
              <li
                key={chapter._id || index}
                className="flex sm:text-base text-sm sm:flex-row items-center flex-wrap"
              >
                <span className="mr-2 font-semibold text-gray-700">
                  {index + 1}.
                </span>
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

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 space-y-4 w-full max-w-2xl mx-auto">
          <h2 className="sm:text-xl text-base font-semibold text-gray-800 break-words">
            Leave a Comment
          </h2>

          <textarea
            className="w-full p-4 border text-sm sm:text-base border-gray-300 rounded-lg resize-none"
            rows="4"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <button
            className="sm:w-auto sm:px-6 sm:py-3 px-3 py-1 sm:text-base text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center"
            onClick={handlePostComment}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
