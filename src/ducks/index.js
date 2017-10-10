import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import templateReducer, { templateEpics } from 'ducks/template/index';
import authReducer, { authEpics } from 'ducks/auth/index';
import errorReducer from 'ducks/errors';

const rootReducer = combineReducers({
    routing: routerReducer,
    template: templateReducer,
    auth: authReducer,
    errors: errorReducer,
});

export const rootEpic = (action$, store) => combineEpics(
    templateEpics,
    authEpics
)(action$, store)
	.do({
		error: error => console.error('ERROR: ', error)
	});

export default rootReducer;
