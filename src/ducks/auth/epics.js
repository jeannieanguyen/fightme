// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { login, register, getVictoriousUser } from 'api/aws';

export const fetchData = function() {
    return apiInstance.get(`/posts`,{
    })
    .then(response => {
        const { data } = response; 
        return data;
    })
    .catch(err => {
        console.error("fail", err);
    });
}

export const setRegisteredUser = (user) => {
	console.log('set registered user', user);
	return {
		type: types.REGISTER_USER_SUCCESS, 
		data: user
	};
}

export const setUserError = (err) => {
	console.log(err);
	return {
		type: types.REGISTER_USER_ERROR, 
		data: err
	};
}

export const registerUserEpic = (action$) => 
	action$.ofType(types.REGISTER_USER)
	.mergeMap((action) => {
		return Observable.from(register(action.data))
			.map((payload) => setRegisteredUser(payload))
			// .catch(err => setUserError(err))
	}); 


export default combineEpics(
    registerUserEpic
);
