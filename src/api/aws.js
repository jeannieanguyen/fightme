import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials, RespondToAuthChallenge } from 'amazon-cognito-identity-js';
import { userPool, USERPOOL_ID} from '../config/aws'; 
import uuid from 'node-uuid'; 
import 'amazon-cognito-js';
var apigClientFactory = require('aws-api-gateway-client').default;

const userAttrs = ["email", "name", "id"];

export function getVictoriousUser(cognitoId) {
	var endpoint
	var config = {
		invokeUrl: 'https://0f5dmn5q21.execute-api.us-west-1.amazonaws.com/demo',
        endpoint: '/v1/users/',
        accessKey: '',
        secretKey: '',
        sessionToken: '',
        region: 'us-west-2',
        defaultContentType: 'application/json',
        defaultAcceptType: 'application/json'
    };
	var apigClient = apigClientFactory.newClient(config);


	var params = {
	};
	// Template syntax follows url-template https://www.npmjs.com/package/url-template
	var pathTemplate = '/v1/users/97'
	var method = 'GET';
	var additionalParams = {
	    //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
	    headers: {
	        david: cognitoId
	    }
	};
	var body = {
	};

	apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
    .then(function(result){
        //This is where you would put a success callback
    }).catch( function(result){
        //This is where you would put an error callback
    });
};

export function register({email, password}){
	// instantiate a promise so we can work with this async easily
	const p = new Promise((res, rej)=>{
		const attributeList = [];
		const dataEmail = {
		    Name : 'email',
		    Value : email
		}; 
		const attributeEmail = new CognitoUserAttribute(dataEmail);
		userPool.signUp(email, password, attributeList, null, function(err, result){
		    if (err) {
		        rej(err);
		    }
		    res({email});
		})
	})
	return p;
};

export function login({email, password}){
	// use a promise to handle async
	const p = new Promise((res, rej)=>{
		// create an `AuthenticationDetails` Cognito object filled with the email+password
		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password
		});
		// create a `CognitoUser` object filled with a username and identity pool
		const userData = {
			Username: email,
			Pool: userPool
		};
		const cognitoUser = new CognitoUser(userData);
		// call the `authenticateUser` method from Cognito, passing in the `CognitoUser` object and the `AuthenticationDetails` object
		authenticateUser(cognitoUser, authenticationDetails)
			.then(()=>{
				// if successfully authenticated, build the user object to return to the Redux state to use
				return buildUserObject(cognitoUser);
			})
			.then((userProfileObject)=>{
				console.log('successfully built object');
				// if successfully built the object, return it back to your React app
				res(userProfileObject);
			})
			.catch((err)=>{
				console.log('le broke'); 
				// if failure, reject the promise
				rej(err)
			});
	});
	return p;
}

export function setPasswordNewUser({password}){

}

// authenticate a user with its `CognitoUser` and `AuthenticationDetails` AWS objects
function authenticateUser(cognitoUser, authenticationDetails){
	// use a promise to handle async
	const p = new Promise((res, rej)=>{
		// call the `authenticateUser` method of the `CognitoUser` object, passing in the `AuthenticationDetails`
		cognitoUser.authenticateUser(authenticationDetails, {
					// handle if successfull
	        onSuccess: function (result) {
							// save the jwtToken on localStorage for access elsewhere in app
				console.log(result); 
	            localStorage.setItem('user_token', result.accessToken.jwtToken);
	            console.log("======== VIEW THE REFRESH TOKEN =========");
	            console.log(localStorage.getItem('user_token'));
	            console.log("======== VIEW THE AUTHENICATION RESULT =========");
	            console.log(result);

							// To
			    		// Edge case, AWS Cognito does not allow for the Logins attr to be dynamically generated. So we must create the loginsObj beforehand
	            const loginsObj = {
	                // For the object's key name, use the USERPOOL_ID taken from our shared aws_profile js file
									// For the object's value, use the jwtToken received in the success callback
	                [USERPOOL_ID]: result.getIdToken().getJwtToken()
	            }
					// in order to use other AWS services (such as S3), we need the correct AWS credentials
					// we set these credentials by passing in a `CognitoIdentityCredentials` object that has our identity pool id and logins object
					// we are logging into an AWS federated identify pool
					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	                Logins : loginsObj
	            });
							// then we refresh our credentials to use the latest one that we set
	            AWS.config.credentials.refresh(function(){
	            	console.log(AWS.config.credentials)
	            });
							// resolve the promise to move on to next step after authentication
	            res(result);
	        },
					// if there was a failure, we reject the promise
	        onFailure: function(err) {
	            rej(err);
	        },
	        newPasswordRequired: function(userAttributes, requiredAttributes) {
	        	rej({
	        		userAttributes, 
	        		requiredAttributes, 
	        		cognitoUser
	        	}); 
	        }
	    });
	});
	return p;
}

// buildUserObject() gets the user attributes from Cognito and creates an object to represent our user
// this will be used by the Redux state so that we can reference the user
function buildUserObject(cognitoUser){
	const p = new Promise((res, rej)=>{
		console.log('building user object'); 
		// call the cognito function `getUserAttributes()`
		cognitoUser.getUserAttributes(function(err, result) {
	        if (err) {
	            console.log('building object', err);
	    				rej(err);
	        }
					// instantiate an empty object
	        let userProfileObject = {};
			// loop through the userAttributes and append to `userProfileObject` as attributes
			for (let i = 0; i < result.length; i++) {
				// custom Cognito attributes will be prefixed with `custom:`, so we must strip away that from the string
		        if(result[i].getName().indexOf('custom:') >= 0){
		    		let name = result[i].getName().slice(7, result[i].getName().length);
		    		userProfileObject[name] = result[i].getValue();
		    	}else{
						// normal Cognito attributes will not be prefixed with `custom:` so we can use use the string immediately
		    		userProfileObject[result[i].getName()] = result[i].getValue();
		    	}
	   		}
	      // and now our user profile object is complete and we resolve the promise to move on to the next step
	      res(userProfileObject);
	    });
	});
	return p;
}

export function setNewUserPassword(cognitoUser, newPassword, userAttributes){
	return new Promise((res, rej) => {
		delete userAttributes.email_verified;
		cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
			onSuccess: function(result){
				res(result);
			}, 
			onFailure: function(err) {
				rej(err);
			}
		});
	}); 
}

// for automatic signin of a user (so they don't have to login each time)
export function retrieveUserFromLocalStorage(){
	const p = new Promise((res, rej)=>{
			// grab the `cognitoUser` object from `userPool`
			// this is possible without login because we had already logged in before (whereas verifyPIN and resetPassword have not)
	    const cognitoUser = userPool.getCurrentUser();
	    console.log("Getting cognitoUser from local storage...");
	    if (cognitoUser != null) {
					// get the latest session from `cognitoUser`
	        cognitoUser.getSession(function(err, session) {
							// if failed to get session, reject the promise
	            if (err) {
	                rej(err);
	            }
							// check that the session is valid
	            console.log('session validity: ' + session.isValid());
	            console.log(session);
							// save to localStorage the jwtToken from the `session`
	            localStorage.setItem('user_token', session.getAccessToken().getJwtToken());
	            // Edge case, AWS Cognito does not allow for the Logins attr to be dynamically generated. So we must create the loginsObj beforehand
	            const loginsObj = {
	                // our loginsObj will just use the jwtToken to verify our user
	                [USERPOOL_ID] : session.getIdToken().getJwtToken()
	            };
				// create a new `CognitoIdentityCredentials` object to set our credentials
				// we are logging into a AWS federated identity pool
    			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	                Logins : loginsObj
	            });
				// refresh the credentials so we can use it in our app
	            AWS.config.credentials.refresh(function(){
	            	console.log(AWS.config.credentials);
					// resolve the promise by again building the user object to be used in our React-Redux app
	            	res(buildUserObject(cognitoUser));
	            });
	        });
	    }else{
				// if failure, reject the promise
	    	rej('Failed to retrieve user from localStorage');	
	    }
	});
	return p;	
}

// signout the current user
export function signOutUser(){
	const p = new Promise((res, rej)=>{
		// since the user is already logged in, we can instantiate `cognitoUser` with `userPool`
		const cognitoUser = userPool.getCurrentUser()
		cognitoUser.signOut()
	})
	return p
}
