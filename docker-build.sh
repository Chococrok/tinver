#!/usr/bin/env bash

version=$(node -p -e "require('./package.json').version")
imageName=chococrok/tinver

npm i

docker build -t ${imageName}:latest -t ${imageName}:${version} .
