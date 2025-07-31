import { useEffect, useState } from "react";
import {
  fetchCommentsByNovel,
  postComment,
  deleteCommentById,
  updateCommentById,
} from "@/services/api"; // ✅ YOUR file

export const useComments = ({ itemId, type }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user and token from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // console.log(parsedUser)
      setUser(parsedUser);
      setToken(parsedUser?.token || null);
    }
  }, []);

  // Fetch comments after user is set
  useEffect(() => {

   
   ;(async () => {if (user) await fetchComments();})()

    console.log(user)
  }, [user]);

  const fetchComments = async () => {
    try {
      const response = await fetchCommentsByNovel(itemId, type, token);
      setComments(response || []);
    } catch (err) {
      console.error("Fetch comments error:", err);
    }
  };

  const submitComment = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      const payload =
        type === "novel"
          ? { content, novelID: itemId }
          : { content, chapterID: itemId };

      if (editingComment) {
        await updateCommentById(editingComment._id, payload, token);
      } else {
        await postComment(payload, token);
      }

      setContent("");
      setEditingComment(null);
      fetchComments();
    } catch (err) {
      console.error("Submit comment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await deleteCommentById(commentId, token);
      fetchComments();
    } catch (err) {
      console.error("Delete comment error:", err);
    }
  };

  return {
    comments,
    content,
    user,
    editingComment,
    loading,
    setContent,
    setEditingComment,
    submitComment,
    deleteComment,
  };
};
