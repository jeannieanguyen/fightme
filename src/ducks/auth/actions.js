// ACTIONS
// Should contain action definitions 
// and pure action dispatches

import * as types from './types';

export function registerUser(data) {
	return (dispatch) => {
		dispatch({
	        type: types.REGISTER_USER,
	        data: data
    	});
	};
};

