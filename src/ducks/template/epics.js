import * as actions from './actions';
import * as types from './types';
import apiInstance from 'api/test';
import { Observable } from 'rxjs';

export const startFetchData = function() {
    return (dispatch) => {dispatch({type: types.FETCH_DATA})};
}

export const fetchData = function() {
    apiInstance.get(`/posts`,{
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

export const incrementCounter = function(incrementAmount) {
    return (dispatch) => {dispatch(actions.incrementCounter(incrementAmount))};
}
