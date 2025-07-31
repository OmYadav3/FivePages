import { fetchData } from "./core";

// GET /comments/:novelId?type=novel
export const fetchCommentsByNovel = (novelId, type, token) =>
  fetchData(`comments/${novelId}?type=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// POST /comments/
export const postComment = ({ content, type, id, token }) => {
  const body =
    type === "novel"
      ? { content, novelID: id }
      : { content, chapterID: id };

  return fetchData("comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });
};

// DELETE /comments/:id
export const deleteCommentById = (commentId, token) =>
  fetchData(`comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// PUT /comments/:id
export const updateCommentById = (commentId, { content, type, id }, token) => {
  const body =
    type === "novel"
      ? { content, novelID: id }
      : { content, chapterID: id };

  return fetchData(`comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });
};
