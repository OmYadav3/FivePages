import { fetchData } from "./core";

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
