import * as types from './types';

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case types.SAMPLE_GET_SUCCESS:
      return {
        ...state,
        sample: action.data.data
      };
    default:
      return state;
  }
}
