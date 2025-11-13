import {
  BASE_API_URL,
  jobDetailsContentEl,
  getData,
  state,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetailsHtml from "./JobDetails.js";
import renderError from "./Error.js";

const loadHandler = async () => {
  const id = window.location.hash.substring(1);

  if (id) {
    jobDetailsContentEl.innerHTML = "";
    renderSpinner("job-details");
    try {
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);
      const { jobItem } = data;

      state.activeJobItem = jobItem;

      renderJobDetailsHtml(jobItem);
      renderSpinner("job-details");
    } catch (error) {
      renderError(error.userError);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
