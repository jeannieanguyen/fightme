import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import errorReducer from 'ducks/errors';
import * as TemplateDuck from 'ducks/template/index';
import * as AuthDuck from 'ducks/auth/index';
// ADD NEW DUCK IMPORT

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: AuthDuck.reducer,
  errors: errorReducer,
  template: TemplateDuck.reducer,
  // ADD NEW DUCK REDUCER
});

export const rootEpic = (action$, store, deps) => combineEpics(
  AuthDuck.epics,
  TemplateDuck.epics,
  // ADD NEW DUCK EPIC
)(action$, store, deps);

export default rootReducer;
