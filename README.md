# dataverse-people

## API paths

```
/api/v1/people/list
```

Copy either config.js.dev or config.js.prod to config.js (to the root, next to index.html) and adjust the URL as necessary.

Inspired by <http://www.adam-bien.com/roller/abien/entry/java_ee_and_docker_quickstart>

/opt/payara/appserver/glassfish/bin/asadmin deploy /tmp/dataverse-people.war

/opt/payara/appserver/glassfish/bin/asadmin login

docker exec -it dataverse-people tail -F ../domains/domain1/logs/server.log

docker exec -it dataverse-people /opt/payara/appserver/glassfish/bin/asadmin deploy /tmp/dataverse-people.war

docker exec -it dataverse-people tail -F /opt/payara/appserver/glassfish/domains/domain1/logs/server.log

docker logs dataverse-people

---

docker rm -f dataverse-people && mvn package && docker build -t iqss/dataverse-people . && docker run -d -p 9080:8080 --name dataverse-people iqss/dataverse-people

curl http://localhost:9080/dataverse-people/resources/message
