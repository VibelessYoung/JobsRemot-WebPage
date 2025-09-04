import{
    errorEL,
    errorTextEL
} from '../common.js';

const renderError = message => {
    errorTextEL.textcontent = message;
    errorEL.classlist.add('error--visible');
    setTimeout(() => {
        error.classlist.remove('error--visible');
    }, 4000);
};

export default renderError;