//IMPORT
import {
  jobListSearchEl,
  jobDetailsContentEl,
  spinnerJobDetailsEl,
  BASE_API_URL,
  getData,
  state,
  ITEM_SIZE_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetailsHtml from "./JobDetails.js";
import renderError from "./Error.js";

//RENDER JOB LIST
const renderjobList = (whichJobList = "search") => {
  //(SEARCH OR BOOKMARK) CHECK
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  //CLEAR JOB LIST
  jobListEl.innerHTML = "";

  let jobItems;

  //CALCULATE
  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * ITEM_SIZE_PER_PAGE - ITEM_SIZE_PER_PAGE,
      state.currentPage * ITEM_SIZE_PER_PAGE
    );
  } else {
    jobItems = state.bookmarkJobItems;
  }

  //SHOW JOB LIST
  jobItems.forEach((jobItem) => {
    const jobItemHtml = `
            <li class="job-item ${
              state.activeJobItem.id === jobItem.id ? "job-item--active" : ""
            }">
                        <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${
                              jobItem.badgeLetters
                            }</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${jobItem.title}</h3>
                                <p class="job-item__company">${
                                  jobItem.company
                                }</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${
                                      jobItem.duration
                                    }</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${
                                      jobItem.salary
                                    }</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${
                                      jobItem.location
                                    }</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon ${
                                  state.bookmarkJobItems.some(
                                    (b) => b.id === jobItem.id
                                  ) && "job-item__bookmark-icon--bookmarked"
                                }"></i>
                                <time class="job-item__time">${
                                  jobItem.daysAgo
                                }d</time>
                            </div>
                        </a>
                    </li>
            `;

    //ADD TO BEFORE-EDN
    jobListEl.insertAdjacentHTML("beforeend", jobItemHtml);
  });
};

//CLICK HANDLING
const clickHandler = async (event) => {
  //PREVENT
  event.preventDefault();

  //FIND JOB ITEM
  const jobItemEL = event.target.closest(".job-item");

  //SET CSS CLASSES
  document
    .querySelectorAll(".job-item--active")
    .forEach((item) => item.classList.remove("job-item--active"));
  jobItemEL.classList.add("job-item--active");

  //CLEAR
  jobDetailsContentEl.innerHTML = "";
  spinnerJobDetailsEl.classList.add("spinner--visible");

  //GET JOB ID
  const jobId = jobItemEL.children[0].getAttribute("href");

  //GET ALL JOBS
  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];

  //UPDATE STATE
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +jobId);

  //FIX LINK
  history.pushState(null, "", `/#${jobId}`);

  try {
    //GET DATA FROM API
    const data = await getData(`${BASE_API_URL}/jobs/${jobId}`);

    const { jobItem } = data;

    //RENDER SPINNER
    renderSpinner("joblist");

    //RENDER JOB DETAILS
    renderJobDetailsHtml(jobItem);
  } catch (error) {
    //HIDE SPINNER
    renderSpinner("joblist");
    //RENDER ERROR
    renderError(error.userError);
  }
};

jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

//EXPORT
export default renderjobList;
