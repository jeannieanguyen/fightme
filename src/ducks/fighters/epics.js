// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { setGeneralError } from 'ducks/errors';
import * as actions from './actions';
import * as types from './types';

// Available args (action$, store, deps)
export const getFightersEpic = (action$, store, deps) =>
  action$.ofType(types.GET_FIGHTERS).mergeMap(action =>
    Observable.from(deps.UFC.getFighters(action.data))
      .map(payload => actions.getFightersSuccess(payload.data))
      .catch(error => Observable.of(setGeneralError(error.message))),
  );

export const getChampionsEpic = (action$, store, deps) =>
  action$
    .ofType(types.GET_CHAMPIONS, types.GET_FIGHTERS_SUCCESS)
    .mergeMap(action =>
      Observable.from(deps.UFC.getChampions(action.data))
        .map(payload => actions.getChampionsSuccess(payload.data))
        .catch(error => Observable.of(setGeneralError(error.message))),
    );
export default combineEpics(getFightersEpic, getChampionsEpic);
