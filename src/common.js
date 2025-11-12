//CONSTANTs
export const BASE_API_URL = "https://bytegrad.com/course-assets/js/2/api";
export const DEFAULT_DISPLAY_TIME = 4000;
//SELECTORS
export const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
export const errorEl = document.querySelector(".error");
export const errorTextEl = document.querySelector(".error__text");
export const jobDetailsEl = document.querySelector(".job-details");
export const jobDetailsContentEl = document.querySelector(
  ".job-details__content"
);
export const jobListBookmarksEl = document.querySelector(
  ".job-list--bookmarks"
);
export const jobListSearchEl = document.querySelector(".job-list--search");
export const numberEl = document.querySelector(".count__number");
export const paginationEl = document.querySelector(".pagination");
export const paginationBtnNextEl = document.querySelector(
  ".pagination__button--next"
);
export const paginationBtnBackEl = document.querySelector(
  ".pagination__button--back"
);
export const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
export const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
export const searchFormEl = document.querySelector(".search");
export const searchInputEl = document.querySelector(".search__input");
export const sortingEl = document.querySelector(".sorting");
export const sortingBtnRelevantEl = document.querySelector(
  ".sorting__button--relevant"
);
export const sortingBtnRecentEl = document.querySelector(
  ".sorting__button--recent"
);
export const spinnerSearchEl = document.querySelector(".spinner--search");
export const spinnerJobDetailsEl = document.querySelector(
  ".spinner--job-details"
);
//HELPER FUNCTION
export const getData = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();
  //4xx 5xx
  if (!response.ok) {
    throw new Error(data.description);
  }
  return data;
};
//STATE
export const state = {
  searchJobItem: [],
  currentPage: 1,
  resultsPerPage: 7,
  activeJobId: {},
  bookmarkJobItems: [],
};
//PAGE HANDLER
export const getJobsByPage = function () {
  const start = (state.currentPage - 1) * state.resultsPerPage;
  const end = state.currentPage * state.resultsPerPage;
  return state.searchJobItem.slice(start, end);
};
