"use client";
import useBooks from "@/hooks/useBooks";
import PopularBooks from "../components/novel/Popular";
import NewReleases from "../components/novel/NewRelease";
import CorouselComponent from "../components/shared/CarouselComponent";
import LazyRender from "@/components/LazyRender";

// Reusable Skeleton Loader
const Skeleton = ({ className = "" }) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
  />
);

export default function Home() {
  const { books, loading, error } = useBooks("novels/latest");

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen gap-6 py-8">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:mx-32 mx-[25px] flex flex-col min-h-screen justify-center items-center py-8">
        <p className="text-red-500 text-center text-lg">{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="lg:mx-32 mx-[25px] flex flex-col min-h-screen justify-center items-center py-8">
        <p className="text-center text-lg text-gray-500">
          No books available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Only show components after the books are loaded */}
      <LazyRender height="h-[300px]">
        <CorouselComponent books={books} />
      </LazyRender>

      <LazyRender height="h-[400px]">
        <PopularBooks books={books} />
      </LazyRender>

      <LazyRender height="h-[400px]">
        <NewReleases books={books} />
      </LazyRender>
    </div>
  );
}
