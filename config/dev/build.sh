#!/bin/sh
BASEDIR=$(dirname "$0")
echo "$BASEDIR"

version=$(npm run version --silent)
echo "Version=$version"
docker build . -t ui-quack:$version --build-arg PROFILE=development

template=`cat "$BASEDIR/deployment.yaml.template" | sed "s/{{version}}/$version/g"`
echo "$template" | kubectl apply -f -
