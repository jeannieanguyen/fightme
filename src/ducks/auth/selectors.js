export const getUser = state => state.auth.user;
export const getSample = state => state.auth.sample;

export const getRegister = (state) => {
  let registeredUser;
  if (state.auth.register) {
    const { user, userConfirmed, userSub } = state.auth.register;
    const username = user.username;
    registeredUser = { username, userConfirmed, userSub };
  }

  return registeredUser;
};
