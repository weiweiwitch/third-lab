FROM relateiq/oracle-java8

RUN echo "Asia/Shanghai" > /etc/timezone; \
	cd /; \
	mkdir data; \
	cd data; mkdir log;

WORKDIR /data

COPY thirdlab thirdlab
COPY static static
COPY cfg cfg

EXPOSE 8282

VOLUME ["/data/log"]

CMD ./thirdlab > log/thirdlab.log
	