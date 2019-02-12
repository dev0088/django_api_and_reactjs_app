#!/bin/bash

# Stop existing docker
docker-compose down
docker-compose stop

# Re-build npm on local
export NVM_DIR="$HOME/.nvm"
source ~/.nvm/nvm.sh

nvm use 11.2.0
npm install
npm run build

# Re-build docker container
docker-compose build --no-cache

# Run docker-compose as daemon
docker-compose up -d