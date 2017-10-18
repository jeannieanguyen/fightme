import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import * as types from './types';
import { registerUserEpic } from './epics';

describe('Auth - registerUserEpic', () => {
  it('should return a success action with correct credentials', () => {
    const action$ = ActionsObservable.of({
      type: types.REGISTER_USER,
      data: {
        email: 'heyo@hey.com',
        password: 'Security1!',
      },
    });

    const deps = {
      register: () => Observable.of([{
        user: {
          username: 'heyo@hey.com',
        },
      }]),
    };

    // TODO - Mock api calls in the epic
    const output$ = registerUserEpic(action$, null, deps);
    output$.toArray().subscribe((actions) => {
      console.log(actions);
      expect(actions[0].type).to.equal(types.REGISTER_USER_SUCCESS);
    });
  });
});
