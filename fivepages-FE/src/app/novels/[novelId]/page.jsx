"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NovelHeader from "../../../components/novel/NovelHeader";
import NovelActions from "../../../components/novel/NovelActions";
import ChapterList from "../../../components/chapter/ChapterList";
import CommentSection from "../../../components/CommentSection/CommentSection";

import {
  fetchNovelById,
  fetchChaptersByNovel,
  // likeNovel,
  // unlikeNovel,
  // addToReadList,
  // removeFromReadList,
} from "../../../services/api.js"; // adjust path if needed

export default function NovelPage(props) {
  const { novelId } = use(props.params);
  const router = useRouter();

  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isInReadList, setIsInReadList] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
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
    };

    fetchAllData();
  }, [novelId]);

  const handleLike = async () => {
    if (!user) return router.push("/login");
    const res = isLiked
      ? await unlikeNovel(novelId, user._id)
      : await likeNovel(novelId, user._id);
    if (!res.error) setIsLiked(!isLiked);
  };

  const handleReadList = async () => {
    if (!user) return router.push("/login");
    const res = isInReadList
      ? await removeFromReadList(novelId, user._id)
      : await addToReadList(novelId, user._id);
    if (!res.error) setIsInReadList(!isInReadList);
  };

  if (!novel) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <div>
      <NovelHeader novel={novel} />
      <NovelActions
        isLiked={isLiked}
        isInReadList={isInReadList}
        onLike={handleLike}
        onReadList={handleReadList}
      />
      <ChapterList chapters={chapters} novelId={novelId} novel={novel} />

      </div>
      <CommentSection novelId={novelId} user={user} />
    </div>
  );
}
