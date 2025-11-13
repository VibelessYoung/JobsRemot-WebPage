//IMPORT
import {
  BASE_API_URL,
  jobDetailsContentEl,
  getData,
  state,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetailsHtml from "./JobDetails.js";
import renderError from "./Error.js";

//LOAD HANDLING
const loadHandler = async () => {
  //GET ID
  const id = window.location.hash.substring(1);

  if (id) {
    //CLEAR JOB DETAILS
    jobDetailsContentEl.innerHTML = "";
    //RENDER SPINNER
    renderSpinner("job-details");
    try {
      //GET DATA FROM API
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);
      const { jobItem } = data;

      //UPDATE STATE
      state.activeJobItem = jobItem;

      //RENDER JOB DETAILS
      renderJobDetailsHtml(jobItem);

      //HIDE SPINNER
      renderSpinner("job-details");
    } catch (error) {
      //RENDER ERROR
      renderError(error.userError);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
