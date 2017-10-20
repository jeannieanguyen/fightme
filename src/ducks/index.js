import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import errorReducer from 'ducks/errors';
import * as TemplateDuck from 'ducks/template/index';
import * as AuthDuck from 'ducks/auth/index';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: AuthDuck.reducer,
  errors: errorReducer,
  template: TemplateDuck.reducer
});

export const rootEpic = (action$, store, deps) => combineEpics(
  AuthDuck.epics,
  TemplateDuck.epics
)(action$, store, deps);

export default rootReducer;
