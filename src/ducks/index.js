import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import authReducer, { authEpics } from 'ducks/auth/index';
import errorReducer from 'ducks/errors';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  errors: errorReducer,
});

export const rootEpic = (action$, store) => combineEpics(
  authEpics,
)(action$, store);

export default rootReducer;
