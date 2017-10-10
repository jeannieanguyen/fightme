import reducer from 'ducks/template/reducers';
import * as templateSelectors from 'ducks/template/selectors';
// import { fetchDataEpic } from './epics';
import templateEpics from './epics';
import * as templateActions from './actions';

// console.log({fetchDataEpic});
// console.log({templateEpics});

export {
  templateEpics,
  templateSelectors,
  templateActions,
};

export default reducer;
