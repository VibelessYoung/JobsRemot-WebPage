import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderjobList from "./Joblist.js";
import renderError from "./Error.js";

function saveJobToLocalStorage(job) {
  if (!job) return;
  const savedJobs = JSON.parse(localStorage.getItem("savedjobs")) || [];
  const exists = savedJobs.find((j) => j.id === job.id);
  if (!exists) {
    savedJobs.push(job);
    localStorage.setItem("savedjobs", JSON.stringify(savedJobs));
  }
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

  if (!state.bookmarkJobItems.includes(currentJob.id)) {
    state.bookmarkJobItems.push(currentJob.id);
    saveJobToLocalStorage(currentJob);
  }

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

//SAVE BOOKMARK UI
document.addEventListener("DOMContentLoaded", () => {
  const savedJobs = JSON.parse(localStorage.getItem("savedjobs")) || [];

  state.bookmarkJobItems = savedJobs.map((job) => job.id);

  renderjobList("bookmarks");

  markBookmarkedIcons();
});

export function markBookmarkedIcons() {
  const jobItems = document.querySelectorAll(".job-item");
  jobItems.forEach((item) => {
    const link = item.querySelector(".job-item__link");
    const jobId = link.getAttribute("href");
    const bookmarkIcon = item.querySelector(".job-item__bookmark-icon");

    if (state.bookmarkJobItems.includes(jobId)) {
      bookmarkIcon.classList.add("job-info__bookmark-icon--bookmarked");
    } else {
      bookmarkIcon.classList.remove("job-info__bookmark-icon--bookmarked");
    }
  });
}

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);
