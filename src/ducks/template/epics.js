// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { setGeneralError } from 'ducks/errors';
import * as actions from './actions';
import * as types from './types';

// export const registerUserEpic = (action$, store, deps) =>
//   action$.ofType(types.REGISTER_USER)
//     .mergeMap(action => Observable.from(deps.AWS.register(action.data))
//       .map(payload => actions.setRegisteredUser(payload))
//       .catch(error => Observable.of(setGeneralError(error.message)),
//       ),
//     );

// export const loginUserEpic = (action$, store, deps) =>
//   action$.ofType(types.LOGIN_USER)
//     .mergeMap(action =>
//       Observable.from(deps.AWS.login(action.data))
//         .map(payload => actions.setLoggedInUser(payload))
//         .catch(error => Observable.of(setGeneralError(error.message)),
//         ),
//     );

export const templateEpic = (action$, store, deps) =>
  action$.ofType(types.TEMPLATE_ACTION)
    .mergeMap(action => 
      Observable.of([1, 2, 3, 4, 5])
        .map(payload => actions.setActionPayload(payload))
        .catch(error => Observable.of(setGeneralError(error)),
        ),
    );

export default combineEpics(
  templateEpic
);
