import { expect } from 'chai';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { CATCHALL_ERROR } from 'ducks/errors';
import * as types from './types';
import { registerUserEpic, loginUserEpic, confirmUserEmailEpic } from './epics';

const correctLoginData = {
  email: 'heyo@hey.com',
  password: 'Security1!',
};
const correctConfirmData = {
  email: 'heyo@hey.com',
  code: '123456',
}
const awsSuccess = {
  AWS: {
    register: () => Observable.of([correctLoginData]),
    login: () => Observable.of([correctLoginData]),
    confirmUserEmail: () => Observable.of([]),
  },
};
const awsError = {
  AWS: {
    register: () => Observable.throw(new Error()),
    login: () => Observable.throw(new Error()),
    confirmUserEmail: () => Observable.of(new Error()),
  },
};

describe('Auth - registerUserEpic', () => {
  it('should return REGISTER_USER_SUCCESS action with correct credentials', () => {
    const action$ = ActionsObservable.of({
      type: types.REGISTER_USER,
      data: correctLoginData,
    });
    const output$ = registerUserEpic(action$, null, awsSuccess);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(types.REGISTER_USER_SUCCESS);
    });
  });

  it('should catch errors during registration', () => {
    const action$ = ActionsObservable.of({
      type: types.REGISTER_USER,
      data: correctLoginData,
    });
    const output$ = registerUserEpic(action$, null, awsError);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(CATCHALL_ERROR);
    });
  });
});

describe('Auth - loginUserEpic', () => {
  it('should return a LOGIN_USER_SUCCESS action with correct credentials', () => {
    const action$ = ActionsObservable.of({
      type: types.LOGIN_USER,
      data: correctLoginData,
    });
    const output$ = loginUserEpic(action$, null, awsSuccess);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(types.LOGIN_USER_SUCCESS);
    });
  });

  it('should catch errors during login', () => {
    const action$ = ActionsObservable.of({
      type: types.LOGIN_USER,
      data: correctLoginData,
    });
    const output$ = loginUserEpic(action$, null, awsError);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(CATCHALL_ERROR);
    });
  });
});

describe('Auth - confirmUserEmailEpic', () => {
  it('should return a REROUTED action with path', () => {
    const action$ = ActionsObservable.of({
      type: types.CONFIRM_USER_EMAIL,
      data: correctConfirmData
    });
    const output$ = confirmUserEmailEpic(action$, null, awsSuccess);

    output$.toArray().subscribe((action) => {
      expect(action[0].type).to.equal(types.REROUTED);
    });
  });

  it ('should catch errors if failed', () => {
    const action$ = ActionsObservable.of({
      type: types.LOGIN_USER,
      data: correctLoginData,
    });
    const output$ = confirmUserEmailEpic(action$, null, awsError);

    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(CATCHALL_ERROR);
    });
  });
});
