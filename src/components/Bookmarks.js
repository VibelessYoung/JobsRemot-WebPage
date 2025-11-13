//IMPORT
import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderjobList from "./JobList.js";

//CLICK HANDLING
const clickHandler = (event) => {
  if (!event.target.className.includes("bookmark")) return; //RETURN

  //CHECKING
  if (
    state.bookmarkJobItems.some(
      (bookmark) => bookmark.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (b) => b.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem); //UPDATE STATE
  }

  //SAVE TO LOCAL STORAGE
  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookmarkJobItems)
  );

  //SET CSS CLASSES
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  //RENDER JOB LIST
  renderjobList("search");
};

//MOUSE ENTER HANDLING
const mouseEnterHandler = () => {
  bookmarksBtnEl.classList.add("bookmarks-btn--active");
  jobListBookmarksEl.classList.add("job-list--visible");

  renderjobList("bookmarks");
};

//MOUSE LEAVE HANDLING
const mouseLeaveHandler = () => {
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);
