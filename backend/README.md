# dataverse-people backend

The backend is written in Jakarta EE.

## Running with Payara Server

```
/usr/local/payara6/bin/asadmin deploy dataverse-people.war
curl http://localhost:8080/dataverse-people/api/v1/people/list
```

## Running with Payara Micro

```
mvn package
java -Djava.net.preferIPv4Stack=true -jar /tmp/payara-micro-*.jar target/dataverse-people.war
curl http://localhost:8080/dataverse-people/api/v1/people/list
```

## Running in Docker

We mount the current directory to `/project` inside the container.

```
mvn package
docker build -t iqss/dataverse-people .
docker run -p 9080:8080 -p 4848:4848 -v ./:/project --name dataverse-people iqss/dataverse-people
curl http://localhost:9080/dataverse-people/api/v1/people/list
```

When troubleshooting deployment:

```
docker kill dataverse-people
docker rm dataverse-people
docker run -it --rm -p 9080:8080 --name dataverse-people iqss/dataverse-people
```

## Redeploying to Docker

There are multiple ways to redeploy the app when it is running inside Payara in Docker.

### Rebuild container

Kill and remove the container. Recompile the app. Then build the container and run it.

### asadmin deploy --force

First, undeploy the war file that was deployed automatically.

```
docker exec -it dataverse-people bash -c '/opt/payara/appserver/glassfish/bin/asadmin -W /project/asadmin-password-file.txt --interactive=false undeploy dataverse-people'
```

Then, make your changes to the code, package it and deploy, repeating as needed.

```
mvn package && sleep 1 && docker exec -it dataverse-people bash -c '/opt/payara/appserver/glassfish/bin/asadmin -W /project/asadmin-password-file.txt --interactive=false deploy --force /project/target/dataverse-people.war'
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
