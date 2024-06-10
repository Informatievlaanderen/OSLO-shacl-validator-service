#!/bin/sh

# Ensure /shacl-validator-config directory exists
mkdir -p /shacl-validator-config/applicatieprofielen

# Fetch the config.properties file and overwrite any existing data
echo "Downloading and overwriting config.properties..."
curl https://raw.githubusercontent.com/Informatievlaanderen/OSLO-shacl-validator-service/config/config.properties -o /shacl-validator-config/applicatieprofielen/config.properties
echo shacl-validator-config/applicatieprofielen/config.properties
