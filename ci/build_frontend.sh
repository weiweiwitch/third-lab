#!/usr/bin/env bash

cd src/main/resources/react

echo $PATH

cp -f .yarnrc.tpl .yarnrc

yarn install
yarn run prod_build