import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";

const clickHandler = (event) => {
  const clickedEL = event.target.closest(".sorting__button");
  if (!clickedEL) return;
  const recent = clickedEL.className.include("--recent") ? true : false;
  if (recent) {
  } else {
  }
};

sortingEl.addEventListener("click", clickHandler);
