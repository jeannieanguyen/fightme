import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import AppData from './reducer_app';

const rootReducer = combineReducers({
    routing: routerReducer,
    appData: AppData
});

export default rootReducer;
