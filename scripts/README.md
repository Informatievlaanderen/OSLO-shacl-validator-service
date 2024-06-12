# Docker Volume Setup Script

This script, `docker-volume.sh`, is designed to automate the setup of a Docker volume named `shacl-validator-config`. It is used within the OSLO-shacl-validator-service project to ensure that the necessary configuration files are available in a Docker volume for use by the backend.

## Overview

The script performs the following actions:

1. Creates a Docker volume named `shacl-validator-config` if it does not already exist.
2. Runs a temporary Alpine container that mounts the newly created volume.
3. Installs `curl` in the temporary container.
4. Downloads the `config.properties` file from a specified URL and saves it into the `resources/applicatieprofielen` directory within the volume.
5. Removes the temporary container after the download is complete.

## Usage

```sh
./docker-volume.sh
```
