import * as types from './types';

const INITIAL_STATE = {
    data: {},
    counter: 0
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
    case types.FETCH_DATA:
        return {
            ...state,
            data: action.data
        };
    case types.INCREMENT_COUNTER:
        return {
            ...state,
            counter: state.counter + action.incrAmt
        };
        default:
            return state;
    }
}
