FROM relateiq/oracle-java8

RUN echo "Asia/Shanghai" > /etc/timezone; \
	cd /; \
	mkdir data; \
	cd data; mkdir log;

WORKDIR /data

COPY thirdlab.jar thirdlab.jar
COPY application.properties application.properties

EXPOSE 8181

VOLUME ["/data/log"]

CMD java -jar thirdlab.jar > log/thirdlab.log
	