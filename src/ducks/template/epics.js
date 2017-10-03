// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import apiInstance from 'api/test';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

export const fetchData = function() {
    return apiInstance.get(`/posts`,{
    })
    .then(response => {
        const { data } = response; 
        return data;
    })
    .catch(err => {
        console.error("fail", err);
    });
}

export const fetchDataEpic = (action$) => 
    action$.ofType(types.FETCH_DATA)
        .mergeMap(() => 
            Observable.from(fetchData())
                .map(actions.setData)
        );

export const incrementCounterEpic = (action$) =>
    action$.ofType(types.INCREMENT_COUNTER)
        .debounceTime(1000)
        .map((action) => actions.setCounter(action.incrAmt));

export default combineEpics(
    fetchDataEpic, 
    incrementCounterEpic
);
