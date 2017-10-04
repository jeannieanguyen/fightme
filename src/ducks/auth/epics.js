// EPICS
// Should contain observable definitions
// and any async / side-effect handlers

import * as actions from './actions';
import * as types from './types';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

// export const fetchData = function() {
//     return apiInstance.get(`/posts`,{
//     })
//     .then(response => {
//         const { data } = response; 
//         return data;
//     })
//     .catch(err => {
//         console.error("fail", err);
//     });
// }

// export default combineEpics(
//     fetchDataEpic, 
//     incrementCounterEpic, 
//     connectSocketEpic, 
//     sendSocketMessageEpic
// );
