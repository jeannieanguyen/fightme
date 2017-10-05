// ACTIONS
// Should contain action definitions 
// and pure action dispatches

import * as types from './types';

export function registerUser(data) {
	console.log('dispatching start action');
	return (dispatch) => {
		dispatch({
	        type: types.REGISTER_USER,
	        data: data
    	});
	};
};

