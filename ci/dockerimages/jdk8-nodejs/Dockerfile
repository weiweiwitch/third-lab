FROM ubuntu:16.04

ENV VERSION 8
ENV UPDATE 162
ENV BUILD 12
ENV SIG 0da788060d494f5095bf8624735fa2f1

ENV JAVA_HOME /usr/lib/jvm/java-${VERSION}-oracle
ENV JRE_HOME ${JAVA_HOME}/jre

RUN apt-get update && apt-get install ca-certificates curl openssh-client -y --no-install-recommends

COPY jdk-8u162-linux-x64.tar.gz .
COPY node-v8.11.3-linux-x64.tar.gz .
COPY yarn-v1.7.0.tar.gz .

# 准备JDK
RUN tar xz -f jdk-8u162-linux-x64.tar.gz -C /tmp && \
	mkdir -p /usr/lib/jvm && mv /tmp/jdk1.${VERSION}.0_${UPDATE} "${JAVA_HOME}" && \
	apt-get autoclean && apt-get --purge -y autoremove && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN update-alternatives --install "/usr/bin/java" "java" "${JRE_HOME}/bin/java" 1 && \
	update-alternatives --install "/usr/bin/javaws" "javaws" "${JRE_HOME}/bin/javaws" 1 && \
	update-alternatives --install "/usr/bin/javac" "javac" "${JAVA_HOME}/bin/javac" 1 && \
	update-alternatives --set java "${JRE_HOME}/bin/java" && \
	update-alternatives --set javaws "${JRE_HOME}/bin/javaws" && \
	update-alternatives --set javac "${JAVA_HOME}/bin/javac"

# 准备nodejs
RUN tar xz -f node-v8.11.3-linux-x64.tar.gz -C /tmp && \
    mkdir -p /opt/nodejs && mv /tmp/node-v8.11.3-linux-x64 /opt/nodejs

ENV PATH "$PATH:/opt/nodejs/node-v8.11.3-linux-x64/bin"

# 准备yarn
RUN tar xz -f yarn-v1.7.0.tar.gz -C /tmp && \
    mkdir -p /opt/yarn && mv /tmp/yarn-v1.7.0 /opt/yarn

ENV PATH "$PATH:/opt/yarn/yarn-v1.7.0/bin"
