import * as types from './types';

const INITIAL_STATE = {
  fighters: [],
  champions: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_FIGHTERS_SUCCESS:
      return {
        ...state,
        fighters: action.data,
      };
    case types.GET_CHAMPIONS_SUCCESS:
      return {
        ...state,
        champions: action.data,
      };
    default:
      return state;
  }
}
