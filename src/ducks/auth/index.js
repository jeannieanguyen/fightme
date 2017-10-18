import reducer from 'ducks/auth/reducers';
import * as authSelectors from 'ducks/auth/selectors';
import authEpics from './epics';
import * as authActions from './actions';

export {
  authEpics,
  authSelectors,
  authActions,
};

export default reducer;
