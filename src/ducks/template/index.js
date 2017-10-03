import reducer from 'ducks/template/reducers';
import * as templateSelectors from 'ducks/template/selectors';
import { fetchDataEpic } from './epics';
import * as templateEpics from './epics';

console.log({fetchDataEpic});
console.log({templateEpics});

export {
    templateEpics,
    fetchDataEpic,
    templateSelectors
};

export default reducer;
