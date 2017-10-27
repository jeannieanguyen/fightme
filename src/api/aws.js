import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import 'amazon-cognito-js';
import { userPool, USERPOOL_ID } from 'config/aws';
import { Observable } from 'rxjs';

export const confirmUserEmail = ({ email, code }) => {
  const p = new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err /* , result */) => {
      if (err) {
        rej(err);
        return;
      }
      res(true);
    });
  });

  return p;
};

// buildUserObject() gets the user attributes from Cognito
// and creates an object to represent our user
// this will be used by the Redux state so that we can reference the user
const buildUserObject = (cognitoUser, authResult = null) => {
  const p = new Promise((res, rej) => {
    cognitoUser.getUserAttributes((err, result) => {
      if (err) {
        rej(err);
      }

      const userProfileObject = {};

      for (let i = 0; i < result.length; i += 1) {
        // custom Cognito attributes will be prefixed with `custom:`,
        // so we must strip away that from the string
        if (result[i].getName().indexOf('custom:') >= 0) {
          const name = result[i].getName().slice(7, result[i].getName().length);
          userProfileObject[name] = result[i].getValue();
        } else {
          userProfileObject[result[i].getName()] = result[i].getValue();
        }
      }

      if (authResult) {
        const tokensObject = {
          accessToken: authResult.accessToken.jwtToken,
          idToken: authResult.idToken.jwtToken,
          refreshToken: authResult.refreshToken.token,
        };
        res({ userObject: userProfileObject, tokensObject });
      }

      res(userProfileObject);
    });
  });
  return p;
};

const authenticateUser = (cognitoUser, authenticationDetails) => {
  const p = new Promise((res, rej) => {
    cognitoUser.authenticateUser(authenticationDetails, {

      onSuccess: (result) => {
        localStorage.setItem('user_token', result.idToken.jwtToken);

        const loginsObj = {
          [USERPOOL_ID]: result.getIdToken().getJwtToken(),
        };

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          Logins: loginsObj,
        });

        AWS.config.credentials.refresh(() => {
        });

        res(result);
      },

      onFailure: (err) => {
        rej(err);
      },
    });
  });
  return p;
};

export const register = ({ email, password }) => {
  // instantiate a promise so we can work with this async easily
  const p = new Promise((res, rej) => {
    const attributeList = [];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });
  return p;
};

export const login = ({ email, password }) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return Observable.from(authenticateUser(cognitoUser, authenticationDetails))
    .mergeMap(authResult => Observable.from(
      buildUserObject(cognitoUser, authResult)));
};

export const retrieveUserFromLocalStorage = () => {
  const p = new Promise((res, rej) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          rej(err);
        }

        const loginsObj = {
          [USERPOOL_ID]: session.getIdToken().getJwtToken(),
        };

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          Logins: loginsObj,
        });
        AWS.config.credentials.refresh(() => {
          res(buildUserObject(cognitoUser));
        });
      });
    } else {
      rej('Failed to retrieve user from localStorage');
    }
  });
  return p;
};


export const signOutUser = () => {
  const p = new Promise(() => {
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.signOut();
  });
  return p;
};
