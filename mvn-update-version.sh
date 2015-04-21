#!/bin/sh

if [ "$1" == "" ]; then
	printf "缺少版本参数！\n"
	exit
fi

mvn versions:set -DnewVersion=$1-SNAPSHOT
mvn versions:commit
