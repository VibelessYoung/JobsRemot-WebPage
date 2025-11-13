import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";
import renderjobList from "./JobList.js";
import renderPagingBtn from "./Pagination.js";

const clickHandler = (event) => {
  const clickedButtonEL = event.target.closest(".sorting__button");

  if (!clickedButtonEL) return;

  state.currentPage = 1;
  renderPagingBtn();

  const recent = clickedButtonEL.className.includes("--recent") ? true : false;

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  renderjobList();
};

sortingEl.addEventListener("click", clickHandler);
