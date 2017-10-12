export const CATCHALL_ERROR = 'CATCHALL_ERROR';

export const setGeneralError = (errorMessage) => {
    return {
        type: CATCHALL_ERROR,
        error: errorMessage,
    }
}

const INITIAL_STATE = {
    error: null
};

export default function (state=INITIAL_STATE, action) {
    switch(action.type) {
        case CATCHALL_ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
          return {
            ...state,
            error: null,
          }
    }
}

export const getGeneralErrorSelector = (state) => state.errors.error;
