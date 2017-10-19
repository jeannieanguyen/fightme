import { pick, isEmpty } from 'lodash';

export const getUser = state => state.auth.user;
export const getSample = state => state.auth.sample;

export const getRegisteredUser = (state) => {
  const registeredUser = pick(state.auth.registeredUser, ['user.username', 'userConfirmed', 'userSub']);

  return isEmpty(registeredUser) ? undefined : registeredUser;
};
