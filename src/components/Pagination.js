import {
  state,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationEl,
} from "../common.js";
import renderjobList from "./JobList.js";

export const updatePaginationUI = () => {
  const totalPages = Math.ceil(
    state.searchJobItem.length / state.resultsPerPage
  );

  if (state.currentPage > 1) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
    paginationNumberBackEl.textContent = state.currentPage - 1;
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
    paginationNumberBackEl.textContent = "";
  }

  if (state.currentPage < totalPages) {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
    paginationNumberNextEl.textContent = state.currentPage + 1;
  } else {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
    paginationNumberNextEl.textContent = "";
  }
  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};

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
  updatePaginationUI();
};
paginationEl.addEventListener("click", pagingHandler);
