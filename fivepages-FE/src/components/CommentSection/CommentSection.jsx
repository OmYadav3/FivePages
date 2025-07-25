"use client";
import { useEffect, useState } from "react";

export default function CommentSection({ itemId, type }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(parsedUser.token || null);
      }
    }
  }, []);

  

  useEffect(() => {
    if (user) {
      fetchComments();
    }
  }, [user]);

  const fetchComments = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}comments/${itemId}?type=${type}`,
        requestOptions
      );
      const data = await res.json();
      console.log(data);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      const url = editingComment
        ? `${process.env.NEXT_PUBLIC_PORT}comments/${editingComment._id}`
        : `${process.env.NEXT_PUBLIC_PORT}comments/`;

      const method = editingComment ? "PUT" : "POST";

      const payload = editingComment
        ? { content }
        : type === "novel"
        ? { content, novelID: itemId }
        : { content, chapterID: itemId };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      // const raw = JSON.stringify(
      //   type === "novel"
      //     ? { content, novelID: itemId }
      //     : { content, chapterID: itemId }
      // );

      // const requestOptions = {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: "follow",
      // };

      // fetch(`${process.env.NEXT_PUBLIC_PORT}/comments/`, requestOptions)
      //   .then((response) => response.json())
      //   .then((result) => console.log(result))
      //   .catch((error) => console.error(error));

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit comment");
      }

      setContent("");
      setEditingComment(null);
      await fetchComments(); // Wait for fetch to complete after DB has been updated
    } catch (err) {
      console.error("Submit error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PORT}comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete");
      }

      fetchComments();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const startEdit = (comment) => {
    setContent(comment.content);
    setEditingComment(comment);
  };

  return (
    <div className="p-4 border rounded-lg mx-2 shadow-sm bg-white ">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border rounded-md p-2 mb-2"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editingComment ? "Update" : "Post"} Comment
        </button>
        {editingComment && (
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={() => {
              setEditingComment(null);
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="space-y-4">
        {Array.isArray(comments) &&
          comments?.map((comment) => (
            <div key={comment._id} className="border p-3 rounded shadow-sm">
              <div className="text-sm text-gray-700 font-semibold">
                {comment.user?.name || "Unknown"} –{" "}
                <span className="text-gray-500 text-xs">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
              {user?._id === comment.user?._id && (
                <div className="mt-2 flex gap-3 text-sm">
                  <button
                    onClick={() => startEdit(comment)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
