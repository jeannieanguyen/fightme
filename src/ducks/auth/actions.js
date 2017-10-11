// ACTIONS
// Should contain action definitions
// and pure action dispatches
import * as types from './types';

export const setRegisteredUser = user => ({
  type: types.REGISTER_USER_SUCCESS,
  data: user,
});

export function registerUser(data) {
  return (dispatch) => {
    dispatch({
      type: types.REGISTER_USER,
      data,
    });
  };
}

export const setLoggedInUser = user => ({
  type: types.LOGIN_USER_SUCCESS,
  data: user,
});

export function loginUser(data) {
  return (dispatch) => {
    dispatch({
      type: types.LOGIN_USER,
      data,
    });
  };
}

export function getSampleService(){
	console.log('dispatchign sample service');
	return (dispatch) => {
		dispatch({
			type: types.SAMPLE_GET
		});
	}
}

export function setSampleData(data){
	return {
		type: types.SAMPLE_GET_SUCCESS,
		data
	}
}
