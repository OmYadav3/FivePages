"use client";
import { BookmarkCheck, BookOpen, Heart } from "lucide-react";

export default function NovelActions({
  novel,
  isLiked,
  isInReadList,
  toggleLike,
  toggleReadList,
  readNow
}) {
  return (
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
        <BookmarkCheck />
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
  );
}
