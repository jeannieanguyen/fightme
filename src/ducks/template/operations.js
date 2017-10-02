import * as actions from './actions';

export const fetchData = function() {
    return (dispatch) => {dispatch(actions.fetchData({data: 'one111'}))};
}

export const incrementCounter = function(incrementAmount) {
    return (dispatch) => {dispatch(actions.incrementCounter(incrementAmount))};
}
