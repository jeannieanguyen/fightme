import { get } from 'lodash';

export const getUser = state => state.auth.user;
export const getSample = state => state.auth.sample;

export const getRegisteredUserDetails = (state) => {
  let registeredUserDetails;
  if (state.auth.register) {
    const username = get(state.auth.register, 'user.username', '');
    const userConfirmed = get(state.auth.register, 'userConfirmed', false);
    const userSub = get(state.auth.register, 'userSub', '');

    registeredUserDetails = { username, userConfirmed, userSub };
  }

  return registeredUserDetails;
};
