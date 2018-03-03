#!/usr/bin/env bash

docker run --name="thirdlab" --restart=always -p 8282:8282 --network="my-bridge-network" --ip="172.18.0.10" -v /Users/ariane/docker/thirdlab:/data/log -d weiweiwitch/thirdlab