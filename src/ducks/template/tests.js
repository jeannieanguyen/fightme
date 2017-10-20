import { expect } from 'chai';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { CATCHALL_ERROR } from 'ducks/errors';
import * as types from './types';
import { templateEpic } from './epics';

describe('Template - templateEpic', () => {
  it('should return TEMPLATE_ACTION_SUCCESS action', () => {
    const action$ = ActionsObservable.of({
      type: types.TEMPLATE_ACTION,
      data: {},
    });
    const output$ = templateEpic(action$, null);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(types.TEMPLATE_ACTION_SUCCESS);
    });
  });

  it('should catch errors during template action', () => {
    const action$ = ActionsObservable.of({
      type: types.TEMPLATE_ACTION,
      data: {},
    });
    const output$ = templateEpic(action$, null);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(CATCHALL_ERROR);
    });
  });
});

