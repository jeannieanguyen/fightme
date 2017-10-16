import AWSCognito from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';


const REGION = 'us-west-2';
const USER_POOL_ID = 'us-west-2_g66KEU85e';
const CLIENT_ID = '6o3eojh3upbnsmietk7pgck0hr';

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
