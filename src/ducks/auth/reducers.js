import * as types from './types';

const INITIAL_STATE = {
    user: null,
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
            };
        default:
            return state;
    }
}
