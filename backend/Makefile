-include .env
export

VERSION := $(shell cat ../VERSION)
# PUBLISHED is a file that contains the docker image to publish to. If it doesn't exist, use the default DOCKER_IMAGE which is an enviorment variable in CI
PUBLISHEDIMAGE := $(shell if [ -f ../PUBLISHED ]; then cat ../PUBLISHED; else echo $(DOCKER_IMAGE); fi)

build:
	docker build -f Dockerfile -t informatievlaanderen/oslo-shacl-validator-service-backend:${VERSION} .

run:
	docker run -it --name oslo-shacl-validator-service-backend -p 8080:8080 informatievlaanderen/oslo-shacl-validator-service-backend:${VERSION} 

stop: docker stop oslo-shacl-validator-service-backend

publish:
	docker tag informatievlaanderen/oslo-shacl-validator-service-backend:${VERSION} ${PUBLISHEDIMAGE}-backend:${VERSION}
	docker push ${PUBLISHEDIMAGE}-backend:${VERSION}

