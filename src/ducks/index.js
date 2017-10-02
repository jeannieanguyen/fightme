import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import templateReducer from 'ducks/template/reducers';

const rootReducer = combineReducers({
    routing: routerReducer,
    template: templateReducer
});

export default rootReducer;
