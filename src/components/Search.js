//IMPORT
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

//SUBMIT HANDLING
const submitHandler = async (event) => {
  event.preventDefault();
  jobListSearchEl.innerHTML = "";

  //GET INPUT TEXT
  const searchText = searchInputEl.value;

  //RESET SORTING BUTTONS
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  //VALIDATION
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("YOUR SEARCH SHOULD NOT BE NUMBER !"); //RENDER ERROR
    return;
  }

  //RESET INPUT
  searchInputEl.blur();

  //SET DEFAULT PAGE NUMBER
  state.currentPage = 1;

  //RENDER PAGING
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

    //SET NUMBER
    numberEl.textContent = jobItems.length;

    //RENDER JOB LIST
    renderjobList();
  } catch (error) {
    //RENDER SPINNER
    renderSpinner("search");
    //RENDER ERROR
    renderError(error.userError);
    //LOG ERROR
    console.log(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
