// ACTIONS
// Should contain action definitions 
// and pure action dispatches
import { browserHistory } from 'react-router';
import * as types from './types';

export const setRegisteredUser = (user) => {
	return {
		type: types.REGISTER_USER_SUCCESS, 
		data: user
	};
};

export function registerUser(data) {
	return (dispatch) => {
		dispatch({
	        type: types.REGISTER_USER,
	        data: data
    	});
	};
};

export const setLoggedInUser = (user) => {
	browserHistory.push('/hello_world');
	return {
		type: types.LOGIN_USER_SUCCESS, 
		data: user
	};
}

export function loginUser(data){
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_USER, 
			data: data
		});
	};
};

