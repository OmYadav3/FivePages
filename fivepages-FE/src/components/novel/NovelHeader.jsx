"use client";
export default function NovelHeader({ novel }) {
  return (
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
        <p className="text-gray-600"><span className="font-semibold">Author:</span> {novel.author}</p>
        <p className="text-gray-600"><span className="font-semibold">Language:</span> {novel.language}</p>
        <p className="text-gray-600"><span className="font-semibold">Published Year:</span> {novel.publishedYear}</p>
        <p className="text-gray-600"><span className="font-semibold">Type:</span> {novel.type}</p>
        <p className="text-gray-600"><span className="font-semibold">Rating:</span> {novel.rating}</p>
        <p className="text-gray-600"><span className="font-semibold">Total Chapters:</span> {novel.chapters?.length}</p>
      </div>
    </div>
  );
}
