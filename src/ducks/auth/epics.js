// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { setGeneralError } from 'ducks/errors';
import * as actions from './actions';
import * as types from './types';

const apigClient = apigClientFactory.newClient();

export const registerUserEpic = (action$, store, deps) =>
  action$.ofType(types.REGISTER_USER)
    .mergeMap(action => Observable.from(deps.AWS.register(action.data))
      .map(payload => actions.setRegisteredUser(payload))
      .catch(error => Observable.of(setGeneralError(error.message)),
      ),
    );

export const loginUserEpic = (action$, store, deps) =>
  action$.ofType(types.LOGIN_USER)
    .mergeMap(action =>
      Observable.from(deps.AWS.login(action.data))
        .map(payload => actions.setLoggedInUser(payload))
        .catch(error => Observable.of(setGeneralError(error.message)),
        ),
    );

export const sampleEpic = action$ =>
  action$.ofType(types.SAMPLE_GET)
    .mergeMap(() =>
      Observable.from(apigClient.v1HelloworldGet({ 'dev-auth': localStorage.getItem('user_token') }))
        .map(payload => actions.setSampleData(payload)));

export default combineEpics(
  registerUserEpic,
  loginUserEpic,
  sampleEpic,
);
