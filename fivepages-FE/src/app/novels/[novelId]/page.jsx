"use client";

import { useRouter } from "next/navigation";

import NovelHeader from "@/components/novel/NovelHeader";
import NovelActions from "@/components/novel/NovelActions";
import ChapterList from "@/components/chapter/ChapterList";
import CommentSection from "@/components/CommentSection";

import { useNovelData } from "@/hooks/useNovelData";
import Link from "next/link";
import { use } from "react";

export default function NovelPage({params}) {
  const { novelId } = use(params);
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
  return (<div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-600 mb-4">Novel's Chapter data not found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to homepage
        </Link>
      </div>)
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
