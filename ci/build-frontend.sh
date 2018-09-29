#!/usr/bin/env bash

cd src/main/resources/react

echo $PATH

npm install
npm run build-prod
BUILD_RT=$?
if [ $BUILD_RT != 0 ];then
    echo "构建失败"
    exit $BUILD_RT
fi

npm run dist
BUILD_RT=$?
if [ $BUILD_RT != 0 ];then
    echo "打包失败"
    exit $BUILD_RT
fi

# 复制发布文件到文件服务器
DISTRIBUTION_SERVER=192.168.11.160
DISTRIBUTION_SERVER_USER=ariane

mkdir -p ~/.ssh/
ssh-keyscan -H ${DISTRIBUTION_SERVER} | tee -a ~/.ssh/known_hosts
scp -i ${keyfile} ${WORKSPACE}/src/main/resources/react/dist/thirdlab*.exe \
    ${DISTRIBUTION_SERVER_USER}@${DISTRIBUTION_SERVER}:/home/${DISTRIBUTION_SERVER_USER}/docker/nginx/thirdlab/

ls static/dist/