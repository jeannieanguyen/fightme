// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import apiInstance from 'api/test';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

const socket$ = Observable.webSocket("wss://echo.websocket.org");

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



export const connectSocketEpic = (action$) => action$.ofType(types.SOCKET_CONNECT)
    .mergeMap(action => 
        socket$.map(payload => console.log('huh', payload))
        .takeUntil(
          action$.ofType(types.SOCKET_DISCONNECT)
        ));

export const sendSocketMessageEpic = (action$) => action$.ofType(types.SOCKET_SEND_MESSAGE)
    .map(action => socket$.next(action.data))
    .map(JSON.stringify)
    .map(payload => {console.log(payload); return actions.receiveMessage(payload)});

export default combineEpics(
    fetchDataEpic, 
    incrementCounterEpic, 
    connectSocketEpic, 
    sendSocketMessageEpic
);
