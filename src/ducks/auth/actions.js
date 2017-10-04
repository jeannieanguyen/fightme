// ACTIONS
// Should contain action definitions 
// and pure action dispatches

import * as types from './types';

export function authenticateUser(data) {
    return {
        type: types.AUTHENTICATE_USER,
        data: data
    }
};

