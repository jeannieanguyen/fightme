import store from 'store';
import { isEmpty } from 'lodash';

export const loadState = (context = 'VictoriousUser') => {
  try {
    return (isEmpty(store.get(context)) ? undefined : store.get(context));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, context = 'VictoriousUser') => {
  try {
    store.set(context, { ...state });
    return { ...state }; // returning value for linting purposes (consistent-return)
  } catch (err) {
    return undefined;
  }
};
