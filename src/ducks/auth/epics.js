// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { login, register, getVictoriousUser } from 'api/aws';

export const registerUserEpic = (action$) => 
	action$.ofType(types.REGISTER_USER)
	.mergeMap((action) => {
		return Observable.from(register(action.data))
			.map((payload) => actions.setRegisteredUser(payload))
	}); 

export const loginUserEpic = (action$) => 
	action$.ofType(types.LOGIN_USER)
	.mergeMap((action) => {
		return Observable.from(login(action.data))
		.map((payload) => {
			return actions.setLoggedInUser(payload);
		})
	});

export default combineEpics(
    registerUserEpic, 
    loginUserEpic
);
