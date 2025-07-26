import { fetchData } from "./core";

export const fetchNovelById = (novelId) => fetchData(`novels/${novelId}`);
export const fetchAllNovels = () => fetchData("novels/");
export const fetchChaptersByNovel = (novelId) => fetchData(`chapters/${novelId}`);
export const fetchChapterById = (chapterId) => fetchData(`chapters/chapter/${chapterId}`);

export const fetchPopularBooks = () => fetchData("novels/latest");
export const fetchNewReleases = () => fetchData("novels/latest");
export const fetchCarouselImages = () => fetchData("novels/latest");
