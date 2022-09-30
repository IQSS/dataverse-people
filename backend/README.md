# dataverse-people backend

The backend is written in Jakarta EE.

## Running with Payara Server

```
/usr/local/payara5/bin/asadmin deploy dataverse-people.war
```

## Running with Payara Micro

```
mvn package
java -jar /tmp/payara-micro-*.jar target/dataverse-people.war
curl http://localhost:8080/dataverse-people/api/v1/people/list
```

## Running in Docker

```
mvn package
docker build -t iqss/dataverse-people .
docker run -d -p 9080:8080 --name dataverse-people iqss/dataverse-people
curl http://localhost:9080/dataverse-people/api/v1/people/list
```

## Acknowledgements

Inspired by <http://www.adam-bien.com/roller/abien/entry/java_ee_and_docker_quickstart>
