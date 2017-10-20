import { expect } from 'chai';
import { ActionsObservable } from 'redux-observable';
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
});

