// ACTIONS
// Should contain action definitions 
// and pure action dispatches

import * as types from './types';

export const startFetchData = function() {
    return (dispatch) => {dispatch({type: types.FETCH_DATA})};
}

export function setData(data) {
    return {
        type: types.FETCH_DATA_SUCCESS,
        data: data
    }
};

export const incrementCounter = function(incrementAmt) {
    return (dispatch) => {
    	dispatch({
    		type: types.INCREMENT_COUNTER, 
    		incrAmt: incrementAmt
    	})
   	};
}

export function setCounter(incrementAmt) {
	console.log('incremting? spellign')
    return {
    	type: types.INCREMENT_COUNTER_SUCCESS,
    	incrAmt: incrementAmt
    };
};
