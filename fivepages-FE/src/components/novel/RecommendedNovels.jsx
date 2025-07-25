"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function RecommendedNovels({ novelId, count = 5 }) {
  const [recommendations, setRecommendations] = useState([]);
  const router = useRouter();

  // Stable navigate handler
  const goToNovel = useCallback(
    (id) => {
      router.push(`/novels/${id}`);
    },
    [router]
  );

  useEffect(() => {
    if (!novelId) return;

    const controller = new AbortController();
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}novels/`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch recommendations:", err);
        }
      }
    };

    fetchRecommendations();
    return () => controller.abort();
  }, [novelId]);

  // Memoize the slice of recommendations
  const topRecs = useMemo(
    () => recommendations.slice(0, count),
    [recommendations, count]
  );

  if (!novelId || topRecs.length === 0) return null;

  return (
    <section className="mt-10 p-4 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">You Might Also Like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {topRecs.map((novel) => (
          <div
            key={novel._id}
            className="bg-white p-3 rounded shadow hover:shadow-md transition cursor-pointer"
            onClick={() => goToNovel(novel._id)}
          >
            <img
              src={novel.thumbnail}
              alt={novel.title}
              className="h-48 w-full object-cover rounded"
            />
            <h4 className="mt-2 font-semibold">{novel.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
