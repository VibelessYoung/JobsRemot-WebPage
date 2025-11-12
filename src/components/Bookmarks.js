import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderjobList from "./Joblist.js";
import renderError from "./Error.js";

function saveJobToLocalStorage(job) {
  const savedJobs = JSON.parse(localStorage.getItem("savedjobs")) || [];
  savedJobs.push(job);
  localStorage.setItem("savedjobs", JSON.stringify(savedJobs));
}

function getJobFromLocalStorage() {
  const savedJobString = localStorage.getItem("savedjob");
  if (savedJobString) {
    return JSON.parse(savedJobString);
  } else {
    return null;
  }
}

const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");
  renderjobList("bookmarks");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

const clickHandler = (event) => {
  if (!event.target.className.includes("bookmark")) return;

  state.bookmarkJobItems.push(state.activeJobId);

  const currentJob = state.searchJobItem;

  saveJobToLocalStorage(currentJob);

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);
