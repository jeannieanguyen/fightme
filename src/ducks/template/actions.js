import * as types from './types';

export function fetchData(data) {
    return {
        type: types.FETCH_DATA,
        data: data
    }
};

export function incrementCounter(incrementAmt) {
    return {
        type: types.INCREMENT_COUNTER,
        incrAmt: incrementAmt
    }
};
