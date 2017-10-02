import * as actions from './actions';
import apiInstance from 'api/test';

export const fetchData = function() {
    return (dispatch) => {

        apiInstance.get(`/posts`,{
        })
        .then(response => {
            const { data } = response; 
            dispatch(actions.fetchData(data))
        })
        .catch(err => {
            console.error("fail", err);
        });
    };
}

export const incrementCounter = function(incrementAmount) {
    return (dispatch) => {dispatch(actions.incrementCounter(incrementAmount))};
}
