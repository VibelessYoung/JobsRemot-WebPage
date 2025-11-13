//IMPORT
import { DEFAULT_DISPLAY_TIME, errorEl, errorTextEl } from "../common.js";

//RENDER ERROR
const renderError = (message = "Somthing went wrong !!!") => {
  //GET MESSAGE
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  //TIMER
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

//EXPORT
export default renderError;
