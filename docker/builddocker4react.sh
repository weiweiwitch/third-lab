#!/usr/bin/env bash

#cp -f ../build/libs/thirdlab.jar .
#cp -f ../application.properties.tpl application.properties

CURRENT_DIR=`pwd`

if [ -d static ]; then
    rm -rf static
fi
if [ -d cfg ]; then
    rm -rf cfg
fi
rm -f thirdlab

cd ../bin
GOOS=linux GOARCH=amd64 go build -o thirdlab ../tl

cd $CURRENT_DIR
cd ../static/react
npm run build

cd $CURRENT_DIR
cp ../bin/thirdlab .
mkdir -p static
cp -r ../static/react/static/dist ./static/
mkdir -p cfg
cp ../cfg/config.json.tpl ./cfg/config.json
python3 modifycfg.py -f ./cfg/config.json

docker build -t weiweiwitch/thirdlab .