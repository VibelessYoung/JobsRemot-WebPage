import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderjobList from "./Joblist.js";

const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

const clickHandler = (event) => {
  if (!event.target.className.includes("bookmark")) return;
  state.bookmarkJobItems.push(state.activeJobId);
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);
