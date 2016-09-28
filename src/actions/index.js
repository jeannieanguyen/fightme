import axios from 'axios';
import config from 'webpack-config-loader!../config.js';
import cookie from 'react-cookie';
import _ from 'lodash';

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
const DEFAULT_ERROR_TEXT = 'An unexpected error occurred. Please try again.';

console.info("API", config.apiBase);


// display error message to user
export function setError(message, reason) {
    return { type: SET_ERROR, message:message, reason:reason };
}

// dismiss previously raised error message
export function clearError() {
    return { type: CLEAR_ERROR };
}

function getCredentials() {

    if(window.name == '') {
        return 'Not Authorized';
    }

    var tTransData = window.atob(window.name);
    let tData = JSON.parse(tTransData);

    return tData;
}
