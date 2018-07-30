
### Install npm packages

	```
	npm install

	# or

	yarn install
	```

### Run app

	```
	npm start

	# or

	yarn start
	```

### Build app

	```
	npm run build

	# or

	yarn run build

	```

### Deployment with Docker image

- Create docker image and run

	```
	$ docker-compose up -d --build
	```

- Rebuild docker image

	```
	$ docker-compose stop

	$ docker-compose build --no-cache
	
	$ docker-compose up -d
	```

### Troubleshooting Docker

	1. Create the docker group.
		```
		$ sudo groupadd docker
		```

	2. Add the user to the docker group.
		```
		$ sudo usermod -aG docker $(whoami)
		```

	3. Log out and log back in to ensure docker runs with correct permissions.

	4. Start docker.
		```
		$ sudo service docker start
		```
