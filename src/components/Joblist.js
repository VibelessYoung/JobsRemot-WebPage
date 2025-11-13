import {
  jobListSearchEl,
  jobDetailsContentEl,
  spinnerJobDetailsEl,
  BASE_API_URL,
  getData,
  state,
  getJobsByPage,
  jobListBookmarksEl,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetailsHtml from "./JobDetails.js";
import renderError from "./Error.js";

const renderjobList = (whichJobList = "search") => {
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  jobListEl.innerHTML = "";

  let jobs;
  if (whichJobList === "search") {
    jobs = getJobsByPage();
  } else if (whichJobList === "bookmarks") {
    const savedJobs = JSON.parse(localStorage.getItem("savedjobs")) || [];
    jobs = savedJobs;
  }

  if (!jobs || jobs.length === 0) {
    return;
  }

  jobs.forEach((jobItem) => {
    const jobItemHtml = `
      <li class="job-item">
        <a class="job-item__link" href="${jobItem.id}">
          <div class="job-item__badge">${jobItem.badgeLetters}</div>
          <div class="job-item__middle">
            <h3 class="third-heading">${jobItem.title}</h3>
            <p class="job-item__company">${jobItem.company}</p>
            <div class="job-item__extras">
              <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
              <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
              <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
            </div>
          </div>
          <div class="job-item__right">
            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
            <time class="job-item__time">${jobItem.daysAgo}d</time>
          </div>
        </a>
      </li>
    `;
    jobListEl.insertAdjacentHTML("beforeend", jobItemHtml);
  });

  if (whichJobList === "search" && state.activeJobId) {
    const activeEl = jobListSearchEl
      .querySelector(`.job-item__link[href="${state.activeJobId}"]`)
      ?.closest(".job-item");
    activeEl?.classList.add("job-item--active");
  }
};

const clickHandler = async (event) => {
  event.preventDefault();
  const jobItemEL = event.target.closest(".job-item");
  if (!jobItemEL) return;

  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");
  jobItemEL.classList.add("job-item--active");

  jobDetailsContentEl.innerHTML = "";
  spinnerJobDetailsEl.classList.add("spinner--visible");

  const jobId = jobItemEL.children[0].getAttribute("href");
  state.activeJobId = jobId;

  history.pushState(null, "", `/#${jobId}`);

  try {
    const data = await getData(`${BASE_API_URL}/jobs/${jobId}`);

    const { jobItem } = data;

    state.searchJobItem = jobItem;

    renderSpinner("joblist");

    renderJobDetailsHtml(jobItem);
  } catch (error) {
    renderSpinner("joblist");
    renderError(error.userError);
  }
};
jobListSearchEl.addEventListener("click", clickHandler);

export default renderjobList;
