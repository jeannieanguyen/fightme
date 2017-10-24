#!/bin/sh

set -e

PROJECT_NAME="the-quacken"
PORT_NUMBER="3000"
CLUSTER_NAME="cluster-1"
VPC_ID="vpc-2f467c46"
REGION="us-east-2"

# chage this when new alb is created
LOAD_BALANCER_ARN="arn:aws:elasticloadbalancing:us-east-2:437326417395:loadbalancer/app/WebALB/5413a3eaff80657d"

FIND_SERVICE=$(aws ecs describe-services --service ${PROJECT_NAME} --cluster ${CLUSTER_NAME} | jq --raw-output .services[].serviceName)
PROJECT_ACTIVE=$(aws ecs describe-services --service ${PROJECT_NAME} --cluster ${CLUSTER_NAME} | jq --raw-output .services[].status)

PROJECT_PATH="/*"

# Update docker-compose.yml with build tag to be used.
sed -i -e "s;%BUILD_TAG%;${CIRCLE_BRANCH};g" ./docker-compose.yml

# Create task definition with the ecs-cli from a docker-compose file.
echo "****** Creating task-definition"
/usr/local/bin/ecs-cli compose --project-name ${PROJECT_NAME} create
echo "------ Task Definition complete"

# Create a targetgroup for the ALB. This check is idempotent. This needs to discover the VPC?? This might not be the best way to do this.
echo "****** Creating Target Group"
aws elbv2 create-target-group --name ${PROJECT_NAME}-target-group --protocol HTTP --port ${PORT_NUMBER} \
--vpc-id ${VPC_ID} --health-check-path /health
echo "------ Target group complete"

TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups --names ${PROJECT_NAME}-target-group | jq --raw-output .TargetGroups[].TargetGroupArn)

# Add targetgroup listener to ALB and store the listnerArn in a variable to be used by the create rule command.
echo "******* Create Listener"
#aws elbv2 create-listener --load-balancer-arn ${LOAD_BALANCER_ARN} --protocol HTTP --port 80 --default-actions Type=forward,TargetGroupArn=${TARGET_GROUP_ARN}
LISTENER_ARN=$(aws elbv2 describe-listeners --load-balancer-arn ${LOAD_BALANCER_ARN} | jq --raw-output ".Listeners | .[] | .ListenerArn")
echo ${LISTENER_ARN}
echo "------- Listener Created"

# Create rule for listener
echo "******* Create Listener Rule"
aws elbv2 create-rule --listener-arn ${LISTENER_ARN} --priority 10 --conditions Field=path-pattern,Values=${PROJECT_PATH} \
--actions Type=forward,TargetGroupArn=${TARGET_GROUP_ARN}
echo "-------- Listener Rule created"

# Find if a service already exists and is marked inactive then create the service. If it does exist then attempt to update it.
if [ "$FIND_SERVICE" = "$PROJECT_NAME" ] && [ "$PROJECT_ACTIVE" = "ACTIVE" ]; then
  echo "${PROJECT_NAME} exists and is active, updating Service."
  aws --region ${REGION} ecs update-service --service "${PROJECT_NAME}" \
    --cluster "$CLUSTER_NAME" \
    --task-definition "ecscompose-${PROJECT_NAME}" \
    --desired-count 1 --deployment-configuration "maximumPercent=200,minimumHealthyPercent=0"
else
  echo "${PROJECT_NAME} doesn't exist or exists and is INACTIVE creating Service."
  aws --region ${REGION} ecs create-service --service-name "${PROJECT_NAME}" \
    --cluster "$CLUSTER_NAME" \
    --task-definition "ecscompose-${PROJECT_NAME}" \
    --load-balancers "targetGroupArn=${TARGET_GROUP_ARN},containerName=${PROJECT_NAME},containerPort=${PORT_NUMBER}" \
    --desired-count 1 --deployment-configuration "maximumPercent=200,minimumHealthyPercent=0" \
    --role ecsServiceRole
fi

echo ${BUILD_TAG}
