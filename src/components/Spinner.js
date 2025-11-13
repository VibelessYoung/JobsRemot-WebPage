//IMPORT
import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

//TOGGLE SPINNER
const renderSpinner = (whichSpinner) => {
  const spinnerEL =
    whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  spinnerEL.classList.toggle("spinner--visible");
};

//EXPORT
export default renderSpinner;
