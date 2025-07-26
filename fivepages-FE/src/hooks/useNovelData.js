import { useEffect, useState } from "react";
import {
  fetchNovelById,
  fetchChaptersByNovel,
} from "@/services/api";

export const useNovelData = (novelId, router) => {
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isInReadList, setIsInReadList] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLiked(parsedUser.likedNovels?.includes(novelId));
          setIsInReadList(parsedUser.readlist?.includes(novelId));
        }

        const novelRes = await fetchNovelById(novelId);
        if (!novelRes.error) setNovel(novelRes);

        const chapterRes = await fetchChaptersByNovel(novelId);
        if (!chapterRes.error) setChapters(chapterRes);
      } catch (err) {
        console.error("Error loading novel data:", err);
      }
    };

    if (novelId) fetchAllData();
  }, [novelId]);

  const handleLike = async () => {
    if (!user) return router.push("/login");

    try {
      const res = isLiked
        ? await unlikeNovel(novelId, user._id)
        : await likeNovel(novelId, user._id);
      if (!res.error) setIsLiked(!isLiked);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleReadList = async () => {
    if (!user) return router.push("/login");

    try {
      const res = isInReadList
        ? await removeFromReadList(novelId, user._id)
        : await addToReadList(novelId, user._id);
      if (!res.error) setIsInReadList(!isInReadList);
    } catch (err) {
      console.error("Readlist error:", err);
    }
  };

  return {
    novel,
    chapters,
    isLiked,
    isInReadList,
    user,
    handleLike,
    handleReadList,
  };
};
