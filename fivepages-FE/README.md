# Old code of User-profile
```
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loadingUser, setLoadingUser] = useState(true);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const defaultUser = useMemo(() => ({
    name: "Guest User",
    email: "guest@example.com",
    profilePic: "/default-avatar.png",
  }), []);

  const getToken = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.token;
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return null;
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found in localStorage");

      setToken(token);
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser(data);
      setNewName(data.name);
      setNewEmail(data.email);
    } catch (error) {
      console.warn("Error fetching user data, using default values:", error);
      setUser(defaultUser);
      setNewName(defaultUser.name);
      setNewEmail(defaultUser.email);
    } finally {
      setLoadingUser(false);
    }
  }, [getToken, defaultUser]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateProfile = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newName.trim() || !newEmail.trim()) {
      return setError("Name and email cannot be empty.");
    }

    setUpdatingProfile(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Token not found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}user/updateProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prev) => ({
          ...prev,
          name: newName,
          email: newEmail,
        }));
        setSuccess("Profile updated successfully!");
      } else {
        setError(data.message || "Error updating profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Something went wrong!");
    } finally {
      setUpdatingProfile(false);
    }
  }, [getToken, newName, newEmail]);

  const handleChangePassword = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!oldPassword.trim() || !newPassword.trim()) {
      return setError("Both old and new passwords are required.");
    }

    if (oldPassword === newPassword) {
      return setError("New password must be different from the old password.");
    }

    setChangingPassword(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Token not found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}user/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(data.message || "Error updating password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Something went wrong!");
    } finally {
      setChangingPassword(false);
    }
  }, [getToken, oldPassword, newPassword]);

  if (loadingUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4">Loading user...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-[#4A90E2] text-center">
          User Profile
        </h2>

        <div className="flex justify-center mt-6">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-sm"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-4 text-center">{success}</p>}

        {/* Profile Update Form */}
        <form onSubmit={handleUpdateProfile} className="mt-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={updatingProfile}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={updatingProfile}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
          </div>

          <button
            type="submit"
            disabled={updatingProfile}
            className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition mt-6 ${
              updatingProfile && "cursor-not-allowed opacity-70"
            }`}
          >
            {updatingProfile ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Password Change Form */}
        <form onSubmit={handleChangePassword} className="mt-8">
          <div className="relative">
            <label className="block text-gray-600 text-sm font-medium">
              Old Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              disabled={changingPassword}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] pr-10"
            />
          </div>

          <div className="mt-4 relative">
            <label className="block text-gray-600 text-sm font-medium">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              disabled={changingPassword}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              disabled={changingPassword || updatingProfile}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className={`w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition mt-6 ${
              changingPassword && "cursor-not-allowed opacity-70"
            }`}
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

# old code of Novel/novelid in Javascript 

```
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import "../../globals.css";
import { BookmarkCheck, BookOpen, Heart } from "lucide-react";
import CommentSection from "./../../components/CommentSection/CommentSection";
import RecommendedNovels from "../../components/RecommendedNovels/RecommendedNovels";

export default function NovelPage() {
  const router = useRouter();
  const { novelId } = useParams();

  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isInReadList, setIsInReadList] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PORT}novels/${novelId}`
        );
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch novel data.");

        setNovel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (novelId) fetchNovel();
  }, [novelId]);

  if (loading) return <p className="text-center text-xl">Loading novel...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const toggleReadList = () => {
    setIsInReadList(!isInReadList);
    alert(
      `${novel.title} ${isInReadList ? "removed from" : "added to"} Read List!`
    );
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    alert(
      `${novel.title} ${isLiked ? "removed from" : "added to"} Liked Novels!`
    );
  };

  const readNow = () => {
    const savedProgress = localStorage.getItem(`lastRead-${novelId}`);
    const chapterIdToRead = savedProgress || novel?.chapters?.[0]?._id;

    if (chapterIdToRead) {
      router.push(`/chapters/${chapterIdToRead}`);
    } else {
      console.error("No chapters available for this novel");
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    console.log("Posting comment:", newComment);
    alert("Comment posted!"); // Replace with actual logic later
    setNewComment("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F4F4] p-4 sm:p-8">
      <div className="w-full max-w-4xl p-6 sm:p-10 bg-white shadow-md border border-gray-300 rounded-xl space-y-10">
        {/* Novel Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={novel.thumbnail}
            alt={novel.title}
            className="w-full md:w-44 h-64 object-cover rounded-lg border border-gray-300"
          />
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {novel.title}
            </h1>
            <p className="text-gray-600">
              <span className="font-semibold">Author:</span> {novel.author}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Language:</span> {novel.language}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Published Year:</span>{" "}
              {novel.publishedYear}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Type:</span> {novel.type}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Rating:</span> {novel.rating}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Chapters:</span>{" "}
              {novel.chapters?.length}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={readNow}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            <BookOpen /> Start Reading
          </button>
          <button
            onClick={toggleReadList}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition ${
              isInReadList
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <BookmarkCheck />{" "}
            {isInReadList ? "Added to Readlist" : "Add to Readlist"}
          </button>
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg transition"
          >
            <Heart color={isLiked ? "#bd0f0f" : "black"} />
            {isLiked ? "Liked" : "Like"}
          </button>
        </div>

        {/* Synopsis */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Synopsis</h2>
          <p className="text-gray-700">{novel.synopsis}</p>
        </div>

        {/* Chapters */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 space-y-4 w-full max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
            Chapters
          </h2>
          <ul className="space-y-3">
            {novel.chapters.map((chapter, index) => (
              <li
                key={chapter._id || index}
                className="flex sm:text-base text-sm sm:flex-row items-center flex-wrap"
              >
                <span className="mr-2 font-semibold text-gray-700">
                  {index + 1}.
                </span>
                <Link
                  href={`/chapters/${chapter._id}`}
                  className="text-blue-600 hover:underline break-words"
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 space-y-4 w-full max-w-2xl mx-auto">
          <h2 className="sm:text-xl text-base font-semibold text-gray-800 break-words">
            Leave a Comment
          </h2>

          <textarea
            className="w-full p-4 border text-sm sm:text-base border-gray-300 rounded-lg resize-none"
            rows="4"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <button
            className="sm:w-auto sm:px-6 sm:py-3 px-3 py-1 sm:text-base text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center"
            onClick={handlePostComment}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

```

# Api.js Old Code 
```

const BASE_URL = process.env.NEXT_PUBLIC_PORT ;

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("user");
    if (!token || token === "undefined" || token.length < 80) {
      console.warn("⚠️ Invalid or malformed token in localStorage:", token);
      return null;
    }
    return token;
  }
  return null;
};

const fetchData = async (endpoint, { method = "GET", body = null, headers = {} } = {}) => {
  try {
    const token = getToken();

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP ${response.status} - ${response.statusText}`);
    }
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return { error: error.message };
  }
};
// ========== NOVEL PAGE RELATED APIs ==========

export const fetchNovelById = (novelId) => fetchData(`novels/${novelId}`);
export const fetchAllNovels = () => fetchData("novels/");
export const fetchChaptersByNovel = (novelId) => fetchData(`chapters/${novelId}`);

export const fetchChapterById = (chapterId) => fetchData(`chapters/chapter/${chapterId}`);


export const fetchPopularBooks = () => fetchData("novels/latest");
export const fetchNewReleases = () => fetchData("novels/latest");
export const fetchCarouselImages = () => fetchData("novels/latest");

export const likeNovel = (novelId, userId) =>
  fetchData(`novels/${novelId}/like`, {
    method: "POST",
    body: { userId },
  });

export const addToReadList = (novelId, userId) =>
  fetchData("readlist", {
    method: "POST",
    body: { novelId, userId },
  });

export const removeFromReadList = (novelId, userId) =>
  fetchData("readlist/remove", {
    method: "DELETE",
    body: { novelId, userId },
  });


//============ COMMENT RELATED APIs =================

export const fetchCommentsByNovel = (novelId) => fetchData(`comments?novelId=${novelId}`);

export const postComment = ({ content, userId, novelId }) =>
  fetchData("comments", {
    method: "POST",
    body: { content, userId, novelId },
  });

export const deleteCommentById = (commentId) =>
  fetchData(`comments/${commentId}`, {
    method: "DELETE" });


  

```