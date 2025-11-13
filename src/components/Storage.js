//IMPORT
import { state } from "../common.js";

//GET FROM LOCALSTORAGE
const storageJobItems = localStorage.getItem("bookmarkJobItems");
if (storageJobItems) {
  state.bookmarkJobItems = JSON.parse(storageJobItems);
}
