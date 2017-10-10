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
