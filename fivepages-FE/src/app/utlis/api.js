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
export const fetchChapterById = (chapterId) => fetchData(`chapters/${chapterId}`);
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


  