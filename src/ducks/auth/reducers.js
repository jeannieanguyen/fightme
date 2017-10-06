import * as types from './types';

const INITIAL_STATE = {
    user: null,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                error: null
            };
        case types.LOGIN_USER_ERROR:
            return {
                ...state,
                user: null,
                error: "Oops! We are unable to log you in. Please re-enter your e-mail and password."
            };
        default:
            return state;
    }
}
