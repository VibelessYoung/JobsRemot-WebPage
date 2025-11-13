import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderjobList from "./JobList.js";

const clickHandler = (event) => {
  if (!event.target.className.includes("bookmark")) return;

  if (
    state.bookmarkJobItems.some(
      (bookmark) => bookmark.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (b) => b.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  //Local Storage
  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookmarkJobItems)
  );

  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

//SAVE BOOKMARK
export const saveBookmarkUI = () => {
  if (
    state.bookmarkJobItems.some(
      (bookmark) => bookmark.id === state.activeJobItem.id
    )
  ) {
    bookmarkIcon.classList.add("job-info__bookmark-icon--bookmarked");
  } else {
    bookmarkIcon.classList.remove("job-info__bookmark-icon--bookmarked");
  }
};

const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");

  renderjobList("bookmarks");
};

const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);
