import store from 'store';
import { isEmpty } from 'lodash';

export const loadState = (context = 'user') => {
  try {
    let returnVal = isEmpty(store.get(context)) ? undefined : store.get(context);
    return returnVal;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, context = 'user') => {
  try {
    store.set(context, { ...state });
    return undefined; // returning value for linting purposes (consistent-return)
  } catch (err) {
    return undefined;
  }
};
