// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { login, register, getVictoriousUser, sampleGet } from 'api/aws';
var apigClient = apigClientFactory.newClient();

export const registerUserEpic = action$ =>
  action$.ofType(types.REGISTER_USER)
    .mergeMap(action => Observable.from(register(action.data))
      .map(payload => actions.setRegisteredUser(payload)));

export const loginUserEpic = action$ =>
  action$.ofType(types.LOGIN_USER)
    .mergeMap(action => Observable.from(login(action.data))
      .map(payload => actions.setLoggedInUser(payload)));

export const sampleEpic = (action$) => 
	action$.ofType(types.SAMPLE_GET)
	.mergeMap((action) => {
		console.log('uhhhhm', localStorage.getItem('user_token'), localStorage); 
		return Observable.from(apigClient.sampleServiceGet({david: localStorage.getItem('user_token')}))
		.map((payload) => {
			return actions.setSampleData(payload);
		})
	});

// export const sampleEpic = (action$) => {
// 	action$.ofType(types.SAMPLE_GET)
// 	.mergeMap((action) => {
// 		return Observable.from(apigClient.sampleServiceGet())
// 		.map((payload) => {
// 			console.log(payload);
// 			return actions.setSampleData(payload);
// 		})
// 	})
// }

export default combineEpics(
  registerUserEpic,
  loginUserEpic,
  sampleEpic,
);
