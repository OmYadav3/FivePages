"use client";

import Link from 'next/link'
import { useChapterData } from "@/hooks/useChapterData";

export default function ChapterPage() {
  const { id, chapter, novel, loading, error } = useChapterData();


  if (loading) return <div>Loading chapter...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!chapter || !novel) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-600 mb-4">Chapter data not found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  const currentIndex = novel.chapters?.findIndex((ch) => ch._id === id) ?? -1;
  const prevChapter =
    currentIndex > 0 ? novel.chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < novel.chapters.length - 1
      ? novel.chapters[currentIndex + 1]
      : null;

  return (
    <div className="max-w-2xl mx-auto sm:px-14 px-2 py-8 border-2 bg-white">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center px-4 mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/novels" className="hover:text-blue-500">
          Novels
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/novels/${novel._id}`} className="hover:text-blue-500">
          {novel.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-400">{chapter.title}</span>
      </nav>

      {/* Titles */}
      <div className="mb-4 px-4">
        <h1 className="text-5xl font-bold text-gray-900">{novel.title}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
          {chapter.title}
        </h2>
      </div>

      {/* Content */}
      <div className="prose max-w-none px-4">
        {chapter.content ? (
          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No content available for this chapter.</p>
          </div>
        )}
      </div>

      {/* Chapter Navigation */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between flex-wrap gap-2">
        {prevChapter ? (
          <Link
            href={`/chapters/${prevChapter._id}`}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Chapter
          </Link>
        ) : (
          <div></div>
        )}

        <Link
          href={`/novels/${novel._id}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Back to Novel
        </Link>

        {nextChapter ? (
          <Link
            href={`/chapters/${nextChapter._id}`}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Next Chapter
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Comments */}
      {/* <div className="mt-12">
        <CommentSection chapterId={chapter._id} />
      </div> */}
    </div>
  );
}
