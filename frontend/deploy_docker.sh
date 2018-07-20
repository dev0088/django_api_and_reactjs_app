#!/bin/bash

# Stop existing docker
docker-compose down
docker-compose stop

# Re-build docker container
docker-compose build --no-cache

# Run docker-compose as deamon
docker-compose up -d
