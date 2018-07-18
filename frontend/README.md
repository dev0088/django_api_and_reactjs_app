
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

	$ docker-compose up -d --build
	```
