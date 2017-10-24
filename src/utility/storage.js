import store from 'store';
import { isEmpty } from 'lodash';

export const localStorageKey = 'VictoriousTokens';

export const loadState = () => {
  try {
    return (isEmpty(store.get(localStorageKey)) ? undefined : store.get(localStorageKey));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    store.set(localStorageKey, { ...state });
  } catch (err) {
    return undefined;
  }
};
