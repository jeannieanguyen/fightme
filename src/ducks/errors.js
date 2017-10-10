export const CATCHALL_ERROR = 'CATCHALL_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const setGeneralError = (errorMessage) => {
    console.log('went into setGeneralError');
    return {
        type: CATCHALL_ERROR,
        error: errorMessage,
    }
}

export const clearGeneralError = () => {
    console.log('went into clearGeneralError');
    return {
        type: CLEAR_ERROR,
    }
}

const INITIAL_STATE = {
    error: null
};

export default function (state=INITIAL_STATE, action) {
    switch(action.type) {
        case CATCHALL_ERROR:
          console.log('in the reducer for errors');
            return {
                ...state,
                error: action.error,
            }
        case CLEAR_ERROR:
          console.log('in the reducer for clear error');
          return {
            ...state,
            error: null,
          }
        default:
            return state;
    }
}

export const getGeneralErrorSelector = (state) => state.errors.error;
