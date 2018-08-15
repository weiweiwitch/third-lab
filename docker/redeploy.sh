#!/usr/bin/env bash

docker stop thirdlab-kt

docker rm -v thirdlab-kt

docker rmi weiweiwitch/thirdlab-kt

# 复制目标文件到发布目录
cp -f ../build/libs/thirdlab*.jar thirdlab.jar
cp -f ../application.properties.tpl application.properties
sed -i '/spring.datasource.url/c\spring.datasource.url=jdbc:mysql://172.99.0.200/tl?useUnicode=true&characterEncoding=utf8' application.properties
sed -i '/spring.datasource.username/c\spring.datasource.username=root' application.properties
sed -i '/spring.datasource.password/c\spring.datasource.password=123456' application.properties

bash builddocker.sh

bash rundocker.sh

# 删除多余文件
rm -f thirdlab.jar
rm -f application.properties