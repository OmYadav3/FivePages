import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchChapterById, fetchNovelById } from "@/services/api";

export function useChapterData() {
  const router = useRouter();
  const { id } = useParams();

  const [chapter, setChapter] = useState(null);
  const [novel, setNovel] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for authentication
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Fetch chapter and novel data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const chapterData = await fetchChapterById(id);
        if (!chapterData || chapterData.error) throw new Error("Failed to fetch chapter");

        chapterData.content = chapterData.content?.replace(/\n/g, "<br>");
        setChapter(chapterData);

        const novelData = await fetchNovelById(chapterData.novel);
        if (!novelData || novelData.error) throw new Error("Failed to fetch novel");

        setNovel(novelData);

        localStorage.setItem(`lastRead-${chapterData.novel}`, chapterData._id);
      } catch (err) {
        console.error("Error fetching chapter/novel:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && id) {
      fetchData();
    }
  }, [id, isAuthenticated]);

  return {
    id,
    chapter,
    novel,
    loading,
    error,
    isAuthenticated,
  };
}
