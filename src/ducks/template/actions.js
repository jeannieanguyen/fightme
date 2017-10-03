import * as types from './types';

export function setData(data) {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data: data
    }
};

export function incrementCounter(incrementAmt) {
    return {
        type: types.INCREMENT_COUNTER,
        incrAmt: incrementAmt
    }
};
