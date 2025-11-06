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
  alert(nextPage);
};
paginationEl.addEventListener("click", pagingHandler);
