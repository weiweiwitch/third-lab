#!/usr/bin/env bash

docker run --name="thirdlab-kt" --restart=always -p 8181:8080 --network="my-bridge-network" --ip="172.18.0.100" -v /home/ariane/tl2/docker/log:/data/log -d weiweiwitch/thirdlab-kt