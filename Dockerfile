#FROM payara/server-full:5.2022.2
#FROM payara/server-full:5.2021.6
FROM payara/server-full:5.2021.5
ENV DEPLOYMENT_DIR /opt/payara/appserver/glassfish/domains/domain1/autodeploy
COPY ./target/micro.war ${DEPLOYMENT_DIR}

#RUN echo $'first line \n\
#second line \n\
#third line' > /etc/nginx/nginx.conf
#RUN echo $'asadmin://admin@localhost:4848 YWRtaW4=' > /opt/payara/.gfclient/pass
#RUN echo 'AS_ADMIN_PASSWORD=admin\n\
#AS_ADMIN_ADMINPASSWORD=admin' > /tmp/asadmin-password.txt
#COPY ./target/micro.war /tmp
#/opt/payara/appserver/glassfish/bin/asadmin deploy /tmp/micro
#COPY ./target/micro.war /opt/payara/appserver/glassfish/domains/domain1/autodeploy
