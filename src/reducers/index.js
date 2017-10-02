import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AppData from './reducer_app';
import templateReducer from 'ducks/template/reducers';

const rootReducer = combineReducers({
    routing: routerReducer,
    appData: AppData,
    template: templateReducer
});

export default rootReducer;
