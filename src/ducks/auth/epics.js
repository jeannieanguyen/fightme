// EPICS
// Should contain observable definitions
// and any async / side-effect handlers


import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { login, register } from 'api/aws';
import * as actions from './actions';
import * as types from './types';

const apigClient = apigClientFactory.newClient();

export const registerUserEpic = action$ =>
  action$.ofType(types.REGISTER_USER)
    .mergeMap(action => Observable.from(register(action.data))
      .map(payload => actions.setRegisteredUser(payload)));

export const loginUserEpic = action$ =>
  action$.ofType(types.LOGIN_USER)
    .mergeMap(action => Observable.from(login(action.data))
      .map(payload => actions.setLoggedInUser(payload)));

export const sampleEpic = action$ =>
  action$.ofType(types.SAMPLE_GET)
    .mergeMap(() =>
      Observable.from(apigClient.sampleServiceGet({ david: localStorage.getItem('user_token') }))
        .map(payload => actions.setSampleData(payload)));

// export const sampleEpic = (action$) => {
//  action$.ofType(types.SAMPLE_GET)
//  .mergeMap((action) => {
//    return Observable.from(apigClient.sampleServiceGet())
//    .map((payload) => {
//      console.log(payload);
//      return actions.setSampleData(payload);
//    })
//  })
// }

export default combineEpics(
  registerUserEpic,
  loginUserEpic,
  sampleEpic,
);
