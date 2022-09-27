# dataverse-people

Inspired by <http://www.adam-bien.com/roller/abien/entry/java_ee_and_docker_quickstart>

/opt/payara/appserver/glassfish/bin/asadmin deploy /tmp/micro.war

/opt/payara/appserver/glassfish/bin/asadmin login

docker exec -it micro tail -F ../domains/domain1/logs/server.log

docker exec -it micro /opt/payara/appserver/glassfish/bin/asadmin deploy /tmp/micro.war

docker exec -it micro tail -F /opt/payara/appserver/glassfish/domains/domain1/logs/server.log

docker logs micro

---

docker rm -f micro && mvn package && docker build -t airhacks/micro . && docker run -d -p 9080:8080 --name micro airhacks/micro

curl http://localhost:9080/micro/resources/message
