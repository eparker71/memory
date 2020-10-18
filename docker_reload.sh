#!/bin/bash

containerid=$(docker ps | grep -v 'CONTAINER' | awk '{print $1}')
docker stop $containerid
docker build -t memory-web .
docker rm memory-app
docker run -dit --name memory-app -p 8080:80 memory-web
