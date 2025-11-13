//IMPORT
import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";
import renderjobList from "./JobList.js";
import renderPagingBtn from "./Pagination.js";

//CLICK HANDLING
const clickHandler = (event) => {
  //FIND SORTING BUTTONS
  const clickedButtonEL = event.target.closest(".sorting__button");

  if (!clickedButtonEL) return; //RETURN

  //SET DEFAULT CURRENT PAGE'S NUMBER
  state.currentPage = 1;

  //RENDER PAGING
  renderPagingBtn();

  //FIND RECENT BUTTON
  const recent = clickedButtonEL.className.includes("--recent") ? true : false;

  //SET CSS CLASSES
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  //SORTING
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  //RENDER JOB LIST
  renderjobList();
};

sortingEl.addEventListener("click", clickHandler);
