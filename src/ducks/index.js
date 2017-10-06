import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import templateReducer, { templateEpics } from 'ducks/template/index';
import authReducer, { authEpics } from 'ducks/auth/index';

const rootReducer = combineReducers({
    routing: routerReducer,
    template: templateReducer,
    auth: authReducer
});

export const rootEpic = (action$, store) => combineEpics(
    templateEpics, 
    authEpics
)(action$, store)
	.do({
		error: error => console.error('ERROR: ', error)
	})
	.catch((error, source) => {
		console.log('error in root epic');
	});

export default rootReducer;
