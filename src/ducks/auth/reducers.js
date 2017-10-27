import * as types from './types';

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        registeredUser: action.data,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case types.CONFIRM_USER_EMAIL_SUCCESS:
      return {
        ...state,
        userEmailConfirmed: action.data,
      };
    case types.SAMPLE_GET_SUCCESS:
      return {
        ...state,
        sample: action.data.data,
      };
    case types.LOGOUT_USER_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
