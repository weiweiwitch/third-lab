#!/bin/sh

docker stop thirdlab-kt

docker rm -v thirdlab-kt

docker rmi weiweiwitch/thirdlab-kt

# cp -f ../build/libs/thirdlab.jar .

bash builddocker.sh

bash rundocker.sh