import store from 'store';
import { isEmpty } from 'lodash';

export const loadState = (context = 'user') => {
  try {
    console.log('context:', context);
    console.log('Called loadState');
    console.log('blah', store.get(context));
    let returnVal = isEmpty(store.get(context)) ? undefined : store.get(context);
    console.log('returnVal:', returnVal);
    return returnVal;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, context = 'user') => {
  try {
    console.log('in saveState with data passed in of:', state);
    store.set(context, { ...state });
    // done to get rid of linter error.
    // Do we want to relax this or standardize how to handle this type of stuff?
    return true;
  } catch (err) {
    return undefined;
  }
};
