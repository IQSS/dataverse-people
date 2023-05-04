# Make the Java base image and version configurable (useful for trying newer Java versions and flavors)
ARG BASE_IMAGE="gdcc/base:unstable"
FROM $BASE_IMAGE

# Make Payara use the "ct" profile for MicroProfile Config. Will switch various defaults for the application
# setup in META-INF/microprofile-config.properties.
# See also https://download.eclipse.org/microprofile/microprofile-config-3.0/microprofile-config-spec-3.0.html#configprofile
ENV MP_CONFIG_PROFILE=ct

# Copy app from assembly in proper layers
COPY --chown=payara:payara maven/app ${DEPLOY_DIR}/dataverse-people/