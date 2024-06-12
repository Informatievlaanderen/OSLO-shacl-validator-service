# config.properties

This config file is used as the source of truth for the [shacl-validator](https://data.vlaanderen.be/shacl-validator). It is used to configure the validation options of the shacl-validator. The actual validator can be found in this repository under the `master` branch.

## Process

1. The `config.properties` file is read by the shacl-validator.
2. The shacl-validator uses the configuration to validate the data.
3. The shacl-validator returns the validation results.

## Updating the config file

The config file should be updated periodically to reflect the latest validation requirements. This can be done manually or via a script or CI/CD pipeline.

## Steps on the server

1. The server reads this file directly from the repository: https://raw.githubusercontent.com/Informatievlaanderen/OSLO-shacl-validator-service/config/config.properties.
2. The server adds this configuration-file to a Docker volume that's linked to the container running the `shacl-validator-backend`. 
3. Restart the running container to apply the changes and use the new configuration from the Docker volume.

For more information on the shacl-validator, please refer to the [README of the Docker image from isaitb](https://hub.docker.com/r/isaitb/shacl-validator).