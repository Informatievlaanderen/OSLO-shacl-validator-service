-include .env
export

VERSION := $(shell cat ../VERSION)
# PUBLISHED is a file that contains the docker image to publish to. If it doesn't exist, use the default DOCKER_IMAGE which is an enviorment variable in CI
PUBLISHEDIMAGE := $(shell if [ -f ../PUBLISHED ]; then cat ../PUBLISHED; else echo $(DOCKER_IMAGE); fi)

build-base:
	docker build -f Dockerfile.base --build-arg "NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}" -t informatievlaanderen/oslo-shacl-validator-service-base:${VERSION} .

build-base-linux:
	docker build --platform=linux/amd64 -f Dockerfile.base --build-arg "NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}" -t informatievlaanderen/oslo-shacl-validator-service-base:${VERSION} .

# first build-base should have been run
build:
	docker build -f Dockerfile.build --build-arg "VERSION=${VERSION}" -t informatievlaanderen/oslo-shacl-validator-service-frontend:${VERSION} .

build-linux:
	docker build --platform=linux/amd64 -f Dockerfile.build --build-arg "VERSION=${VERSION}" -t informatievlaanderen/oslo-shacl-validator-service-frontend:${VERSION} .

exec:
	docker run -it --rm --name oslo-shacl-validator-service-frontend -p 3000:3000 informatievlaanderen/oslo-shacl-validator-service-frontend:${VERSION} sh

run:
	docker run -d --rm --name oslo-shacl-validator-service-frontend -p 3000:3000 informatievlaanderen/oslo-shacl-validator-service-frontend:${VERSION}


stop:
	docker stop oslo-shacl-validator-service-frontend

publish:
	docker tag informatievlaanderen/oslo-shacl-validator-service-frontend:${VERSION} ${PUBLISHEDIMAGE}-frontend:${VERSION}
	docker push ${PUBLISHEDIMAGE}-frontend:${VERSION}
