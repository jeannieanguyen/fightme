import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import templateReducer, { fetchDataEpic } from 'ducks/template/index';

const rootReducer = combineReducers({
    routing: routerReducer,
    template: templateReducer
});

export const rootEpic = combineEpics(
    fetchDataEpic
);

console.log({rootEpic});

export default rootReducer;
