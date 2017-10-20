import * as types from './types';

const INITIAL_STATE = {
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.TEMPLATE_ACTION_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
