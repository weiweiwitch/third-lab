#!/usr/bin/env bash

# 显示一些环境信息
echo $PATH
java -version
echo $JAVA_HOME
pwd
ls -al

# 构建游戏服
sh gradlew clean assembleBootDist
GRADLE_RT=$?
if [ $GRADLE_RT != 0 ];then
    echo "构建失败"
    exit $GRADLE_RT
fi

# 复制发布文件到文件服务器
DISTRIBUTION_SERVER=192.168.11.160
DISTRIBUTION_SERVER_USER=ariane

mkdir -p ~/.ssh/
ssh-keyscan -H ${DISTRIBUTION_SERVER} | tee -a ~/.ssh/known_hosts
scp -i ${keyfile} ${WORKSPACE}/build/distributions/thirdlab.tar.gz \
    ${DISTRIBUTION_SERVER_USER}@${DISTRIBUTION_SERVER}:/home/${DISTRIBUTION_SERVER_USER}/docker/nginx/thirdlab/
