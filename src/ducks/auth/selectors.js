import { pick } from 'lodash';

export const getUser = state => state.auth.user;
export const getSample = state => state.auth.sample;

export const getRegisteredUser = (state) => {
  let registeredUser;
  if (state.auth.registeredUser) {
    registeredUser = pick(state.auth.registeredUser, ['user.username', 'userConfirmed', 'userSub']);
  }

  return registeredUser;
};
