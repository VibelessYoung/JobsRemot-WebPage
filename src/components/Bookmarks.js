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

  const currentJob = state.searchJobItem;
  const savedJobs = JSON.parse(localStorage.getItem("savedjobs")) || [];
  const jobIndex = savedJobs.findIndex((j) => j.id === currentJob.id);
  const bookmarkIcon = document.querySelector(".job-info__bookmark-icon");

  if (jobIndex === -1) {
    savedJobs.push(currentJob);
    localStorage.setItem("savedjobs", JSON.stringify(savedJobs));
    state.bookmarkJobItems.push(currentJob.id);
    bookmarkIcon.classList.add("job-info__bookmark-icon--bookmarked");
  } else {
    savedJobs.splice(jobIndex, 1);
    localStorage.setItem("savedjobs", JSON.stringify(savedJobs));
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (id) => id !== currentJob.id
    );
    bookmarkIcon.classList.remove("job-info__bookmark-icon--bookmarked");
  }

  renderjobList("bookmarks");
  markBookmarkedIcons();
};

//SAVE BOOKMARK UI
document.addEventListener("DOMContentLoaded", () => {
  const savedJobs = JSON.parse(localStorage.getItem("savedjobs")) || [];

  state.bookmarkJobItems = savedJobs.map((job) => job.id);

  renderjobList("bookmarks");

  markBookmarkedIcons();

  const bookmarkIcon = document.querySelector(".job-info__bookmark-icon");
  if (
    bookmarkIcon &&
    state.activeJobId &&
    state.bookmarkJobItems.includes(state.activeJobId)
  ) {
    bookmarkIcon.classList.add("job-info__bookmark-icon--bookmarked");
  }
});

export function markBookmarkedIcons() {
  const jobItems = document.querySelectorAll(".job-item");
  jobItems.forEach((item) => {
    const link = item.querySelector(".job-item__link");
    if (!link) return;

    const href = link.getAttribute("href");
    const jobId = href.replace(/^#/, "").trim();

    const bookmarkIcon = item.querySelector(".job-item__bookmark-icon");
    if (!bookmarkIcon) return;

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
