import { createSelector } from 'reselect'; 

// Non-memoized selectors
export const getAppData = (state) => state.appData; 

// Memoized selectors that transform/compute state
// export const getTransformedAppData = createSelector(selector_1, selector_2, () => {});
