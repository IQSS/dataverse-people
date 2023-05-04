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

Using Maven:

```
mvn -Pct clean package docker:build docker:run
curl http://localhost:8080/dataverse-people/api/v1/people/list
```

Using Docker commands:

```
mvn package
docker build -t iqss/dataverse-people .
docker run -d -p 9080:8080 --name dataverse-people iqss/dataverse-people
curl http://localhost:9080/dataverse-people/api/v1/people/list
```

When troubleshooting deployment:

```
docker kill dataverse-people
docker rm dataverse-people
docker run -it --rm -p 9080:8080 --name dataverse-people iqss/dataverse-people
```

## Reformatting code

```
mvn spotless:apply
```

Alternatively, you can just run a check:

```
mvn spotless:check
```

## Acknowledgements

Inspired by <http://www.adam-bien.com/roller/abien/entry/java_ee_and_docker_quickstart>
