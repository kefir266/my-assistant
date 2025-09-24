#!/bin/sh

set -xe

if [ -z $DOCKER ]; then
    ENV_FILE=".env"
    SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id "$SECRET_ARN" --query 'SecretString' --output text)
    echo "$SECRET_JSON" | jq -r 'to_entries | .[] | "\(.key)=\(.value)"' >> "$ENV_FILE"
    export $(cat "$ENV_FILE" | xargs)
fi

env 
npm run start
