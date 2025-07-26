import { fetchData } from "./core";

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
