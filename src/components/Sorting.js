import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
} from "../common.js";

const clickHandler = (event) => {
  const clickedEL = event.target.closest(".sorting__button");
  if (!clickedEL) {
    return;
  }
  alert("true");
};

sortingEl.addEventListener("click", clickHandler);
