#!/bin/bash

# Stop existing docker
docker-compose down
docker-compose stop

# Re-build npm on local
nvm use 9.8.0
npm install
npm run build

# Re-build docker container
docker-compose build --no-cache

# Run docker-compose as deamon
docker-compose up -d