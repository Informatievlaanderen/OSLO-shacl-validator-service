#!/bin/bash

# Name of the Docker volume
VOLUME_NAME="shacl-validator-config"

# URL of the config.properties file
CONFIG_URL="https://raw.githubusercontent.com/Informatievlaanderen/OSLO-shacl-validator-service/config/config.properties"

# Temporary container name
TEMP_CONTAINER="temp-downloader"

# Target directory inside the volume
TARGET_DIR="/tmp/resources/applicatieprofielen"

# Create the Docker volume if it doesn't already exist
docker volume create $VOLUME_NAME

# Run a temporary container that mounts the volume
docker run --name $TEMP_CONTAINER -v $VOLUME_NAME:/tmp alpine /bin/sh -c "apk add --no-cache curl && mkdir -p $TARGET_DIR && curl -Ls $CONFIG_URL -o $TARGET_DIR/config.properties"

# Cleanup: Remove the temporary container
docker rm $TEMP_CONTAINER

echo "config.properties has been fetched and stored in the Docker volume '$VOLUME_NAME' under 'resources/applicatieprofielen/'."

# RESTART ALL SERVICES USING THIS DOCKER VOLUME

# Define an array of service names
SERVICE_NAMES=("oslo_shacl-validator-eu-backend")

# Loop through the service names and restart each
for SERVICE_NAME in "${SERVICE_NAMES[@]}"; do
    echo "Restarting Docker service: $SERVICE_NAME..."
    docker service update --force $SERVICE_NAME
    echo "Docker service '$SERVICE_NAME' has been restarted."
done
