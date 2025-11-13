//IMPORT
import {
  state,
  paginationEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  ITEM_SIZE_PER_PAGE,
} from "../common.js";
import renderjobList from "./JobList.js";

//RENDER PAGING
const renderPagingBtn = () => {
  //SET CSS CLASSES
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  //CALCULATE
  if (
    state.searchJobItems.length - state.currentPage * ITEM_SIZE_PER_PAGE <=
    0
  ) {
    //SET CSS CLASSES
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  //INCREASE PAGING NUMBERS
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  //BLUR (CLEAR FOCUS)
  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

//PAGING HANDLING
const pagingHandler = (event) => {
  //FIND PAGING BUTTONS
  const clickedButton = event.target.closest(".pagination__button");

  if (!clickedButton) return; //RETURN

  //FIND NEXT
  const nextPage = clickedButton.className.includes("--next") ? true : false;

  //INCREASE CURRENT PAGE NUMBER
  nextPage ? state.currentPage++ : state.currentPage--;

  //RENDERING
  renderPagingBtn();
  renderjobList();
};

paginationEl.addEventListener("click", pagingHandler);

//EXPORT
export default renderPagingBtn;
