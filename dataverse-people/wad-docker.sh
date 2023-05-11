#!/bin/bash -x
# From https://www.youtube.com/watch?v=V_haSihHHV8
# and https://blog.sebastian-daschner.com/entries/reloading-javaee-apps-wad
#
# Download wad.jar from https://wad.sh or https://github.com/AdamBien/wad/releases/latest
WAD_PATH=/tmp
DEPLOY_DIR=/opt/payara/deployments

docker build -f Dockerfile -t dataverse-people:1 .
docker stop dataverse-people || true

# https://guides.dataverse.org/en/5.13/container/base-image.html#tunables
ENABLE_RELOAD=1

docker run -d --rm \
  --name dataverse-people \
  -p 8080:8080 \
  -v /tmp/wad-dropins/:${DEPLOY_DIR} \
  dataverse-people:1
#  -v /tmp/wad-dropins/:/opt/wlp/usr/servers/defaultServer/dropins/ \

java -jar -Dmaven.home=/Users/pdurbin/github/tools/java/apache-maven-3.9.0 ${WAD_PATH}/wad.jar /tmp/wad-dropins/
