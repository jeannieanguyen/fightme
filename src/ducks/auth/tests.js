import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { CATCHALL_ERROR } from 'ducks/errors';
import * as types from './types';
import { registerUserEpic, loginUserEpic } from './epics';


describe('Auth - registerUserEpic', () => {
  it('should return REGISTER_USER_SUCCESS action with correct credentials', () => {
    const action$ = ActionsObservable.of({
      type: types.REGISTER_USER,
      data: {
        email: 'heyo@hey.com',
        password: 'Security1!',
      },
    });

    const deps = {
      AWS: {
        register: () => Observable.of([{
          user: {
            username: 'heyo@hey.com',
          },
        }]),
      },
    };

    const output$ = registerUserEpic(action$, null, deps);
    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(types.REGISTER_USER_SUCCESS);
    });
  });
});

describe('Auth - loginUserEpic', () => {
  it('should return a LOGIN_USER_SUCCESS action with correct credentials', () => {
    const action$ = ActionsObservable.of({
      type: types.LOGIN_USER,
      data: {
        email: 'heyo@hey.com',
        password: 'Security1!',
      },
    });

    const deps = {
      AWS: {
        login: () => Observable.of([{
          sub: '999',
          email_verified: true,
          email: 'heyo@hey.com',
        }]),
      },
    };

    const output$ = loginUserEpic(action$, null, deps);
    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(types.LOGIN_USER_SUCCESS);
    });
  });

  it('should catch errors during login', () => {
    const action$ = ActionsObservable.of({
      type: types.LOGIN_USER,
      data: {
        email: 'heyo@hey.com',
        password: 'Security1!',
      },
    });
    const errorMsg = 'User doesn\'t exist';
    const deps = {
      AWS: {
        login: () => Observable.throw(new Error(errorMsg)),
      },
    };

    const output$ = loginUserEpic(action$, null, deps);
    output$.toArray().subscribe((actions) => {
      expect(actions[0].type).to.equal(CATCHALL_ERROR);
    });
  });
});
