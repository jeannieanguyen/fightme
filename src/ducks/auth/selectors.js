import { get, pick, isEmpty } from 'lodash';

export const getUser = state => state.auth.user;
export const getSample = state => state.auth.sample;

export const getUserEmailConfirmed = state => state.auth.userEmailConfirmed;

export const getRegisteredUser = (state) => {
  const registeredUser = pick(state.auth.registeredUser, ['user.username', 'userConfirmed', 'userSub']);

  return isEmpty(registeredUser) ? undefined : registeredUser;
};

export const getUserTokenObject = state => get(state.auth.user, 'tokensObject', undefined);
