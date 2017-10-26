import AWSCognito from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';


const REGION = 'us-east-2';
const USER_POOL_ID = 'us-east-2_tLqkFIwT8';
const CLIENT_ID = '12dqjs4d861uqe4roii43j241i';

AWSCognito.config.update({
  region: REGION,
});
const userData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

export const BUCKET_NAME = 'foundation-cms';
export const userPool = new CognitoUserPool(userData);
export const USERPOOL_ID = `cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`;
