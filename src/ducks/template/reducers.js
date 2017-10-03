import * as types from './types';

const INITIAL_STATE = {
    data: [],
    counter: 0
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.data
            };
        case types.INCREMENT_COUNTER_SUCCESS:
            return {
                ...state,
                counter: state.counter + action.incrAmt
            };
        default:
            return state;
    }
}
