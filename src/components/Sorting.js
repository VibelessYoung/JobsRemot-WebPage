import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";

const clickHandler = (event) => {
  const clickedEL = event.target.closest(".sorting__button");
  if (!clickedEL) return;
  const recent = clickedEL.className.includes("--recent") ? true : false;
  if (recent) {
    state.searchJobItem.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
    console.log(state.searchJobItem);
  } else {
  }
};

sortingEl.addEventListener("click", clickHandler);
