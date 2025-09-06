import {
    jobListSearchEl,
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    numberEl,
    BASE_API_URL
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderjobList from './JobList.js';

const submitHandler = event => {
    event.preventDefault();

    jobListSearchEl.innerHTML = '';
    //get input search text
    const searchText = searchInputEl.value;

    //Validation
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('your search may not contain numbers');
        //renderError();
        return;
    }

    searchInputEl.blur();

    renderSpinner('search');
    // fetch('data.json');
    fetch(`${BASE_API_URL}/232323232323232jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                throw {
                    message: 'Respone not exist'
                }
            }

            return response.json();
        })
        .then(data => {
            // job items           
            const { jobItems } = data;
            numberEl.textContent = jobItems.length;

            renderSpinner('search');

            renderjobList(jobItems);

        })
        .catch(error => {
            console.log(error.message);
            renderSpinner('search');
            renderError(error.message);
        });
};
searchFormEl.addEventListener('submit', submitHandler);