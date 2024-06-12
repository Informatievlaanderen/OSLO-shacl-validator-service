# OSLO-shacl-validator-service - BACKEND

## Setup
The `/backend` directory contains the backend part of the OSLO SHACL Validator Service. The backend is a small layer on top of the [SHACL validator from isaitb](https://hub.docker.com/r/isaitb/shacl-validator). 

### Dockerfile

nside the `Dockerfile` you can find the instructions on how to build the Docker image for the backend service. The main difference here is the use of a Docker volume called `shacl-validator-config`. This volume should contain the `config.properties` for this backend to run. The structure of the Docker volume should be as follows:

```
resources  
└───applicatieprofielen
│   │   config.properties
```

The `config.properties` file can be found in its own branch [here](https://raw.githubusercontent.com/Informatievlaanderen/OSLO-shacl-validator-service/config/config.properties)

### Makefile

The `Makefile` contains a set of tasks for building and running the backend service. It includes tasks for building the Docker image, running the Docker container, and cleaning up the Docker environment.