import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";
import renderjobList from "./Joblist.js";
import { updatePaginationUI } from "./Pagination.js";

const clickHandler = (event) => {
  const clickedEL = event.target.closest(".sorting__button");
  if (!clickedEL) return;
  state.currentPage = 1;
  updatePaginationUI();
  const recent = clickedEL.className.includes("--recent") ? true : false;
  //CHANGE BUTTONS ACTIVE STYLE
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }
  //SORTING
  if (recent) {
    state.searchJobItem.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItem.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  renderjobList();
};

sortingEl.addEventListener("click", clickHandler);
