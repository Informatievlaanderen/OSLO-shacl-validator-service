FROM isaitb/shacl-validator:latest

RUN apt-get update && apt-get install -y git

# Copy the entrypoint script into the container
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME [ "/backend-resources" ]

ENV validator.resourceRoot /backend-resources/

ENTRYPOINT ["/entrypoint.sh"]