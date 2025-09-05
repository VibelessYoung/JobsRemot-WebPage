import {
    errorEl,
    errorTextEl
} from '../common.js';

const renderError = message => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    }, 4000);
};

export default renderError;