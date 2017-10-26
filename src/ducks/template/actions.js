// ACTIONS
// Should contain action definitions
// and pure action dispatches
import * as types from './types';

export const setActionPayload = payload => ({
  type: types.TEMPLATE_ACTION_SUCCESS,
  data: payload,
});

export const startAction = data =>
  dispatch =>
    dispatch({
      type: types.TEMPLATE_ACTION,
      data,
    });

