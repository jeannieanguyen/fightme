// ACTIONS
// Should contain action definitions
// and pure action dispatches
import * as types from './types';

export const setRegisteredUser = user => ({
  type: types.REGISTER_USER_SUCCESS,
  data: user,
});

export const registerUser = data =>
  dispatch =>
    dispatch({
      type: types.REGISTER_USER,
      data,
    });

export const setLoggedInUser = user => ({
  type: types.LOGIN_USER_SUCCESS,
  data: user,
});

export const loginUser = data =>
  dispatch =>
    dispatch({
      type: types.LOGIN_USER,
      data,
    });

export const getSampleService = () =>
  dispatch =>
    dispatch({
      type: types.SAMPLE_GET,
    });

export const setSampleData = data => ({
  type: types.SAMPLE_GET_SUCCESS,
  data,
});

export const confirmUserEmail = data =>
  dispatch =>
    dispatch({
      type: types.CONFIRM_USER_EMAIL,
      data,
    });

export const rerouted = data => ({
  type: types.REROUTED,
  data,
});

export const logoutUser = () => ({
  type: types.LOGOUT,
});

export const logoutUserSuccess = () => ({
  type: types.LOGOUT_USER_SUCCESS,
});

