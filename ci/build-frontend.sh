#!/usr/bin/env bash

cd src/main/resources/react

echo $PATH

npm install --verbose
npm run build-renderer-prod
BUILD_RT=$?
if [ $BUILD_RT != 0 ];then
    echo "构建失败"
    exit $BUILD_RT
fi

ls static/dist/