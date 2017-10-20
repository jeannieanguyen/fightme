// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { setGeneralError } from 'ducks/errors';
import * as actions from './actions';
import * as types from './types';

// Available args (action$, store, deps)
export const templateEpic = action$ =>
  action$.ofType(types.TEMPLATE_ACTION)
    .mergeMap(() =>
      Observable.of([1, 2, 3, 4, 5])
        .map(payload => actions.setActionPayload(payload))
        .catch(error => Observable.of(setGeneralError(error)),
        ),
    );

export default combineEpics(
  templateEpic,
);
