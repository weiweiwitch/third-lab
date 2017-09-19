#!/bin/sh

docker stop thirdlab

docker rm -v thirdlab

docker rmi weiweiwitch/thirdlab

bash builddocker4react.sh

bash rundocker.sh