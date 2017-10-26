import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import 'amazon-cognito-js';
import { userPool, USERPOOL_ID } from '../config/aws';

export function register({ email, password }) {
  // instantiate a promise so we can work with this async easily
  const p = new Promise((res, rej) => {
    const attributeList = [];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        rej(err);
      }
      localStorage.setItem("unconfirmed_email", email);
      localStorage.setItem("unconfirmed_password", password);
      res(result);
    });
  }).catch(err => err);
  return p;
}

export function confirmUserEmail({email, code}) {
  const p = new Promise((res, rej) => {
    const attributeList = [];
    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result:' + result);

      const email = localStorage.getItem("unconfirmed_email");
      const password = localStorage.getItem("unconfirmed_password");
      console.log("Email: ", email);
      console.log("Password: ", password);

      // TODO route from here login(email, password);

      res(result);

    });
  });
}

// buildUserObject() gets the user attributes from Cognito
// and creates an object to represent our user
// this will be used by the Redux state so that we can reference the user
function buildUserObject(cognitoUser) {
  const p = new Promise((res, rej) => {
    console.log('building user object');
    // call the cognito function `getUserAttributes()`
    cognitoUser.getUserAttributes((err, result) => {
      if (err) {
        console.log('building object', err);
        rej(err);
      }
      // instantiate an empty object
      const userProfileObject = {};
      // loop through the userAttributes and
      // append to `userProfileObject` as attributes
      for (let i = 0; i < result.length; i += 1) {
        // custom Cognito attributes will be prefixed with `custom:`,
        // so we must strip away that from the string
        if (result[i].getName().indexOf('custom:') >= 0) {
          const name = result[i].getName().slice(7, result[i].getName().length);
          userProfileObject[name] = result[i].getValue();
        } else {
          // normal Cognito attributes will not be prefixed with `custom:`
          // so we can use use the string immediately
          userProfileObject[result[i].getName()] = result[i].getValue();
        }
      }
      // and now our user profile object is complete
      // and we resolve the promise to move on to the next step
      res(userProfileObject);
    });
  });
  return p;
}

// authenticate a user with its `CognitoUser` and `AuthenticationDetails` AWS objects
function authenticateUser(cognitoUser, authenticationDetails) {
  // use a promise to handle async
  const p = new Promise((res, rej) => {
    // call the `authenticateUser` method of the `CognitoUser` object,
    // passing in the `AuthenticationDetails`
    cognitoUser.authenticateUser(authenticationDetails, {
      // handle if successfull
      onSuccess: (result) => {
        // save the jwtToken on localStorage for access elsewhere in app
        localStorage.setItem('user_token', result.idToken.jwtToken);

        // To
        // Edge case, AWS Cognito does not allow for the Logins attr to be dynamically generated.
        // So we must create the loginsObj beforehand
        const loginsObj = {
          // For the object's key name, use the USERPOOL_ID taken
          // from our shared aws_profile js file
          // For the object's value, use the jwtToken received in the success callback
          [USERPOOL_ID]: result.getIdToken().getJwtToken(),
        };
        // in order to use other AWS services (such as S3), we need the correct AWS credentials
        // we set these credentials by passing in a `CognitoIdentityCredentials`
        // object that has our identity pool id and logins object
        // we are logging into an AWS federated identify pool
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          Logins: loginsObj,
        });
        // then we refresh our credentials to use the latest one that we set
        AWS.config.credentials.refresh(() => {
          console.log(AWS.config.credentials);
        });
        // resolve the promise to move on to next step after authentication
        res(result);
      },
      // if there was a failure, we reject the promise
      onFailure: (err) => {
        rej(err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        rej({
          userAttributes,
          requiredAttributes,
          cognitoUser,
        });
      },
    });
  });
  return p;
}

export function login({ email, password }) {
  // use a promise to handle async
  const p = new Promise((res, rej) => {
    // create an `AuthenticationDetails` Cognito object filled with the email+password
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    // create a `CognitoUser` object filled with a username and identity pool
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    // call the `authenticateUser` method from Cognito, passing in the `CognitoUser` object
    // and the `AuthenticationDetails` object
    authenticateUser(cognitoUser, authenticationDetails)
      .then((result) => {
        console.log('in login', result);
        // if successfully authenticated, build the user object to return to the Redux state to use
        return buildUserObject(cognitoUser);
      })
      .then((userProfileObject) => {
        console.log('successfully built object');
        // if successfully built the object, return it back to your React app
        res(userProfileObject);
      })
      .catch((err) => {
        // if failure, reject the promise
        rej(err);
      });
  });
  return p;
}

export function setNewUserPassword(cognitoUser, newPassword, userAttributes) {
  return new Promise((res, rej) => {
    const newUserAttributes = { ...userAttributes };
    delete newUserAttributes.email_verified;
    cognitoUser.completeNewPasswordChallenge(newPassword, newUserAttributes, {
      onSuccess(result) {
        res(result);
      },
      onFailure(err) {
        rej(err);
      },
    });
  });
}

// for automatic signin of a user (so they don't have to login each time)
export function retrieveUserFromLocalStorage() {
  const p = new Promise((res, rej) => {
    // grab the `cognitoUser` object from `userPool`
    // this is possible without login because we had already logged in
    // before (whereas verifyPIN and resetPassword have not)
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      // get the latest session from `cognitoUser`
      cognitoUser.getSession((err, session) => {
        // if failed to get session, reject the promise
        if (err) {
          rej(err);
        }

        // NOTE: getSession must be called to authenticate user before calling getUserAttributes
        cognitoUser.getUserAttributes(function(err, attributes) {
            if (err) {
                // Handle error
            } else {
                console.dir("Attributes: ", attributes);
            }
        });

        // save to localStorage the jwtToken from the `session`
        localStorage.setItem('user_token', session.getIdToken().getJwtToken());
        // Edge case, AWS Cognito does not allow for the Logins attr
        // to be dynamically generated. So we must create the loginsObj beforehand
        const loginsObj = {
          // our loginsObj will just use the jwtToken to verify our user
          [USERPOOL_ID]: session.getIdToken().getJwtToken(),
        };
        // create a new `CognitoIdentityCredentials` object to set our credentials
        // we are logging into a AWS federated identity pool
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          Logins: loginsObj,
        });
        // refresh the credentials so we can use it in our app
        AWS.config.credentials.refresh(() => {
          console.log(AWS.config.credentials);
          // resolve the promise by again building the user object to be used in our React-Redux app
          res(buildUserObject(cognitoUser));
        });
      });
    } else {
      // if failure, reject the promise
      rej('Failed to retrieve user from localStorage');
    }
  });
  return p;
}

// signout the current user
export function signOutUser() {
  const p = new Promise(() => {
    // since the user is already logged in, we can instantiate `cognitoUser` with `userPool`
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.signOut();
  });
  return p;
}
