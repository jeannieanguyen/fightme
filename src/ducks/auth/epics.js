// EPICS
// Should contain observable definitions
// and any async / side-effect handlers


import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { login, register } from 'api/aws';
import { setGeneralError, clearGeneralError } from 'ducks/errors';
import * as actions from './actions';
import * as types from './types';

const apigClient = apigClientFactory.newClient();

export const registerUserEpic = action$ =>
  action$.ofType(types.REGISTER_USER)
    .mergeMap(action => Observable.from(register(action.data))
      .map(payload => actions.setRegisteredUser(payoad))
      .catch((error, source) => {console.log(error); return Observable.of(setGeneralError(error.message))}
      )
    );

export const loginUserEpic = action$ =>
  action$.ofType(types.LOGIN_USER)
    .mergeMap(action =>
      Observable.from(login(action.data))
      .map(payload => actions.setLoggedInUser(payload))
      .catch((error, source) => Observable.of(setGeneralError(error.datamessage))
      )
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
