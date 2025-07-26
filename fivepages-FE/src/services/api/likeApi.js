import { fetchData } from "./core";

export const likeNovel = (novelId, userId) =>
  fetchData(`novels/${novelId}/like`, {
    method: "POST",
    body: { userId },
  });
