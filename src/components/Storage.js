import { state } from "../common.js";

const storageJobItems = localStorage.getItem("bookmarkJobItems");
if (storageJobItems) {
  state.bookmarkJobItems = JSON.parse(storageJobItems);
}
