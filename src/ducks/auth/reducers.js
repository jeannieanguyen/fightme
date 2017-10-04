import * as types from './types';

const INITIAL_STATE = {
    user: null
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        // case types.FETCH_DATA_SUCCESS:
        //     return {
        //         ...state,
        //         data: action.data
        //     };
        default:
            return state;
    }
}
