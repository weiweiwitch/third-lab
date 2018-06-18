#!/usr/bin/env bash

pwd

# 停止容器
RUNNING_TARGET_CONTAINER=$(docker ps -aq -f ancestor=weiweiwitch/thirdlab-kt -f status=running)
if [ "$RUNNING_TARGET_CONTAINER" != "" ]; then
    docker stop $RUNNING_TARGET_CONTAINER
fi

# 删除容器
TARGET_CONTAINER=$(docker ps -aq -f ancestor=weiweiwitch/thirdlab-kt)
if [ "$TARGET_CONTAINER" != "" ]; then
    docker rm -v $TARGET_CONTAINER
fi

# 删除镜像
if [ "$(docker images -q weiweiwitch/thirdlab-kt)" != "" ]; then
    docker rmi weiweiwitch/thirdlab-kt
fi

# 构建镜像
if [ -f thirdlab.tar.gz ]; then
    rm -f thirdlab.tar.gz
fi
wget http://192.168.11.160:10000/thirdlab/thirdlab.tar.gz

if [ -f jdk-8u162-linux-x64.tar.gz ]; then
    rm -f jdk-8u162-linux-x64.tar.gz
fi
wget http://192.168.11.160:10000/tools/jdk-8u162-linux-x64.tar.gz

cp -f ci/dockerimages/jdk8-thirdlab/Dockerfile .
cp -f ci/application.properties .

docker build -t="weiweiwitch/thirdlab-kt" .

# 启动容器
docker run --name="thirdlab-kt" --restart=always \
    -p 8181:8080 --network="my-bridge-network" --ip="172.18.0.20" \
    -v /home/ariane/tl2/docker/log:/data/log -d weiweiwitch/thirdlab-kt