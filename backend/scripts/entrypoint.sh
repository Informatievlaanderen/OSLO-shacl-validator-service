#!/bin/sh

echo "running"
# Check if the directory is empty
if [ -z "$(ls -A /backend-resources)" ]; then
    echo "Directory is empty. Cloning the repository."
    git clone https://github.com/yourusername/yourrepository.git /backend-resources
else
    echo "Directory is not empty. Pulling latest changes."
    cd /backend-resources
    git pull
fi
# Execute the main command
exec "$@"
