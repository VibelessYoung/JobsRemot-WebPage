import {
  state,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationEl,
} from "../common.js";
import renderjobList from "./JobList.js";

const pagingHandler = (event) => {
  const clickedButton = event.target.closest(".pagination__button");
  if (!clickedButton) return;
  const nextPage = clickedButton.className.includes("--next") ? true : false;
  const totalPages = Math.ceil(
    state.searchJobItem.length / state.resultsPerPage
  );

  if (nextPage && state.currentPage < totalPages) state.currentPage++;
  else if (!nextPage && state.currentPage > 1) state.currentPage--;

  renderjobList();
};
paginationEl.addEventListener("click", pagingHandler);
