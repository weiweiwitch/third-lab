#!/bin/sh

docker stop thirdlab

docker rm -v thirdlab

docker rmi weiweiwitch/thirdlab

cp -f ../build/libs/thirdlab.jar .

bash builddocker.sh

bash rundocker.sh