import * as actions from '../actions';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case actions.SET_ERROR:
            return {error:{ message: action.message, reason: action.reason}};
        case actions.CLEAR_ERROR:
            state = INITIAL_STATE;
            return state;
        default:
            return state;
    }
}
