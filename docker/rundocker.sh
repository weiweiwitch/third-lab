#!/usr/bin/env bash

docker run --name="thirdlab-kt" --restart=always \
    -p 8181:8080 --network="my-bridge-network" \
    --ip="172.99.0.20" \
    -v /home/ariane/tl2/docker/log:/data/log \
    -d weiweiwitch/thirdlab-kt