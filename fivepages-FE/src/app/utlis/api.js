const BASE_URL = "http://localhost:5000/api/v1/";

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token.length < 20) {
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

export const fetchPopularBooks = () => fetchData("novels/latest");
export const fetchNewReleases = () => fetchData("novels/latest");
export const fetchCarouselImages = () => fetchData("novels/latest");
export const fetchNovelById = (id) => fetchData(`novels/${id}`);

// 🔹 Comments
export const fetchCommentsByNovel = (novelId) => fetchData(`comments?novelId=${novelId}`);
export const postComment = ({ content, userId, novelId }) =>
  fetchData("comments", {
    method: "POST",
    body: { content, userId, novelId },
  });
export const deleteCommentById = (commentId) =>
  fetchData(`comments/${commentId}`, {
    method: "DELETE",
  });

// 🔐 Authenticated User
export const fetchCurrentUser = () => fetchData("users");
