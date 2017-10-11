// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { login, register, getVictoriousUser } from 'api/aws';
import { setGeneralError, clearGeneralError } from 'ducks/errors';

export const registerUserEpic = action$ =>
  action$.ofType(types.REGISTER_USER)
    .mergeMap(action => Observable.from(register(action.data))
      .map(payload => actions.setRegisteredUser(payload)));

export const loginUserEpic = action$ =>
  action$.ofType(types.LOGIN_USER)
    .mergeMap(action =>
      Observable.from(login(action.data))
      .map(payload => actions.setLoggedInUser(payload))
      .concat( Observable.of(clearGeneralError()))// Clears error after setting a logged in user
      .catch((error, source) => Observable.of(setGeneralError(error.message))// Note: the stream seems ok if you encounter an error and then put in the right e-mail and password combo
      )
    );

export default combineEpics(
  registerUserEpic,
  loginUserEpic,
);
