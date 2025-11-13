import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  jobListSearchEl,
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  state,
  numberEl,
  BASE_API_URL,
  getData,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderjobList from "./JobList.js";
import renderPagingBtn from "./Pagination.js";

const submitHandler = async (event) => {
  event.preventDefault();
  jobListSearchEl.innerHTML = "";
  //get input search text
  const searchText = searchInputEl.value;

  //Reset Sorting Btn
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  //Validation
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("your search may not contain numbers");
    //renderError();
    return;
  }

  searchInputEl.blur();

  state.currentPage = 1;
  renderPagingBtn();

  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    //GET JOB-ITEM
    const { jobItems } = data;

    //UPDATE STATE
    state.searchJobItems = jobItems;

    //DELETE SPINNER
    renderSpinner("search");

    numberEl.textContent = jobItems.length;

    renderjobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.userError);
    console.log(error.message);
  }
};
searchFormEl.addEventListener("submit", submitHandler);
