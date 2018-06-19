#!/usr/bin/env bash

cd src/main/resources/react

echo $PATH

cp -f .yarnrc.tpl .yarnrc

rm -rf node_modules
yarn cache clean
yarn install
yarn run prod_build