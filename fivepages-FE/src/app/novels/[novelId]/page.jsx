"use client";
import { useRouter } from "next/navigation";

import NovelHeader from "@/components/novel/NovelHeader";
import NovelActions from "@/components/novel/NovelActions";
import ChapterList from "@/components/chapter/ChapterList";
import CommentSection from "@/components/CommentSection/CommentSection";

import { useNovelData } from "@/hooks/useNovelData";

export default function NovelPage(props) {
  const { novelId } = props.params;
  const router = useRouter();

  const {
    novel,
    chapters,
    isLiked,
    isInReadList,
    user,
    handleLike,
    handleReadList,
  } = useNovelData(novelId, router);

  if (!novel || chapters.length === 0) {
  return <div className="text-center mt-20">Loading...</div>;
}

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
