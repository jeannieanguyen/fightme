// ACTIONS
// Should contain action definitions
// and pure action dispatches
import * as types from './types';

export const getFightersSuccess = data => ({
  type: types.GET_FIGHTERS_SUCCESS,
  data,
});

export const getFighters = () => ({
  type: types.GET_FIGHTERS,
});

export const getChampionsSuccess = data => ({
  type: types.GET_CHAMPIONS_SUCCESS,
  data,
});

export const getChampions = () => ({
  type: types.GET_CHAMPIONS,
});
