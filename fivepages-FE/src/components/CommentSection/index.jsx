"use client";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useComments } from "@/hooks/useComments";

export default function CommentSection({ itemId, type }) {
  const {
    comments,
    content,
    user,
    editingComment,
    loading,
    setContent,
    setEditingComment,
    submitComment,
    deleteComment,
  } = useComments({ itemId, type });

  return (
    <div className="p-4 border rounded-lg mx-2 shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <CommentForm
        content={content}
        setContent={setContent}
        editingComment={editingComment}
        submitComment={submitComment}
        cancelEdit={() => {
          setEditingComment(null);
          setContent("");
        }}
        loading={loading}
      />
      <CommentList
        comments={comments}
        user={user}
        onEdit={setEditingComment}
        onDelete={deleteComment}
      />
    </div>
  );
}
