#!/bin/bash

containerid=$(docker ps | grep -v 'CONTAINER' | awk '{print $1}')
docker stop $containerid
docker build --rm -f "Dockerfile" -t memory:latest .
docker run --rm -d -p 80:80/tcp memory:latest
