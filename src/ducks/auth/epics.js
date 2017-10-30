// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { browserHistory } from 'react-router';
import { setGeneralError } from 'ducks/errors';
import * as actions from './actions';
import * as types from './types';

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

export const confirmUserEmailEpic = (action$, store, deps) =>
  action$.ofType(types.CONFIRM_USER_EMAIL)
    .mergeMap(action =>
      Observable.from(deps.AWS.confirmUserEmail(action.data))
        .map(() => actions.rerouted('/login'))
        .do(() => browserHistory.push('/login'))
        .catch(error => Observable.of(setGeneralError(error.message))),
    );

export const routeToDashboardEpic = action$ =>
  action$.ofType(types.LOGIN_USER_SUCCESS)
    .mapTo(actions.rerouted('/hello_world'))
    .do(() => {
      browserHistory.push('/hello_world');
    });

export const sampleEpic = (action$, store, deps) =>
  action$.ofType(types.SAMPLE_GET)
    .mergeMap(() =>
      Observable.from(deps.apigClient.v1HelloworldGet({ 'dev-auth': get(store.getState(), 'auth.user.tokensObject.idToken') }))
        .map(payload => actions.setSampleData(payload))
        .catch((error) => {
          if (error.status === 401) {
            return Observable.merge(
              Observable.of(actions.logoutUser()),
              Observable.of(setGeneralError(get(error, 'data.message', 'User is unauthorized'))),
            );
          }
        }),
    );

export const logoutUserEpic = action$ =>
  action$.ofType(types.LOGOUT)
    .mapTo(actions.logoutUserSuccess())
    .do(() => {
      browserHistory.push('/login');
    });

export default combineEpics(
  registerUserEpic,
  loginUserEpic,
  confirmUserEmailEpic,
  sampleEpic,
  routeToDashboardEpic,
  logoutUserEpic,
);
