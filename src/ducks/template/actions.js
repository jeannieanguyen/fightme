// ACTIONS
// Should contain action definitions
// and pure action dispatches

import * as types from './types';

export const startFetchData = function () {
  return (dispatch) => { dispatch({ type: types.FETCH_DATA }); };
};

export function setData(data) {
  return {
    type: types.FETCH_DATA_SUCCESS,
    data,
  };
}

export const incrementCounter = function (incrementAmt) {
  return (dispatch) => {
    dispatch({
      type: types.INCREMENT_COUNTER,
      incrAmt: incrementAmt,
    });
  };
};

export function setCounter(incrementAmt) {
  return {
    type: types.INCREMENT_COUNTER_SUCCESS,
    incrAmt: incrementAmt,
  };
}
