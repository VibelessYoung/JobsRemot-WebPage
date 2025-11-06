import {
  jobListSearchEl,
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
  state,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderjobList from "./JobList.js";
import { updatePaginationUI } from "./Pagination.js";

const submitHandler = async (event) => {
  event.preventDefault();

  jobListSearchEl.innerHTML = "";
  //get input search text
  const searchText = searchInputEl.value;

  //Validation
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("your search may not contain numbers");
    //renderError();
    return;
  }

  searchInputEl.blur();

  renderSpinner("search");

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
    //jobitems
    const { jobItems } = data;

    //update state
    state.searchJobItem = jobItems;

    // Reset to first page
    state.currentPage = 1;

    //delete spinner
    renderSpinner("search");

    numberEl.textContent = jobItems.length;

    renderjobList();
    updatePaginationUI();
  } catch (error) {
    renderSpinner("search");
    renderError(error.userError);
    console.log(error.message);
  }
};
searchFormEl.addEventListener("submit", submitHandler);
