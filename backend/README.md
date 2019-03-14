Python/Django + JWT auth backend
================================

### Technical Stack

	- Python/Django: python 3.6,

	- Database: PostgreSQL

	- JWT auth based RESTful API

### Preinstall
export LANGUAGE="en_US.UTF-8"
sudo apt-get install build-essential libssl-dev libffi-dev python-dev
sudo apt-get install zlib1g-dev libjpeg-dev
sudo apt-get install build-essential checkinstall && apt-get build-dep imagemagick -y
sudo apt-get install imagemagick

### Remove Python3.5 env
```
sudo apt-get purge python3.5-dev
sudo apt-get remove --auto-remove python3.5-dev

sudo apt-get purge python3.5
sudo apt-get purge --auto-remove python3.5

```

### Python3.6 env

```
sudo add-apt-repository ppa:jonathonf/python-3.6
$ apt-get update

$ apt-get install python3.6

$ apt-get install python3-pip
```

### Create server

	```
	$ python3.6 -m venv env3

	or

	$ python3.6 -m venv env3 --without-pip

	$ source env3/bin/activate

	$ pip install coreapi django djangorestframework djangorestframework-jwt

	$ pip freeze > requirements.txt

	$ django-admin startproject config .
	```

### Get static files

	```
	$ ./manage.py collectstatic
	```

### Migrate models into database
	```
	$ ./manage.py makemigrations
	```

### Create admin user on server

	```
	$ ./manage.py migrate

	$ ./manage.py createsuperuser
	```

### Run server
	```
	$ ./manage.py runserver
	```

### Additional 

	- for preview-generate package

	```
	$ pip install preview-generator

	In the case Mac OS, 

	$ brew install freetype 
	$ brew install imagemagick
	$ brew install libmagic
	$ brew install ghostscript

	$ brew install imagemagick@6
	$ ln -s /usr/local/Cellar/imagemagick@6/6.9.10-9/lib/libMagickWand-6.Q16.dylib /usr/local/lib/libMagickWand.dylib

	In the case Ubuntu,
	$ apt-get install zlib1g-dev libjpeg-dev

	In the case CentOS
	$ yum install zlib1g-dev libjpeg-dev
	```
### Server urls

- http://127.0.0.1:8000

- http://127.0.0.1:8000/api/auth/token/obtain/

- http://127.0.0.1:8000/api/echo

### Troubleshooting
- Remove migration files
	After faking the migrations for all apps we need to delete the migrations files inside migrations folder in each app.

	You can use the previous bash script to automate this process in Unix bases OSs.

	```
	$ find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
	$ find . -path "*/migrations/*.pyc"  -delete
	```
	This will delete Python source files and also compiled Python files for migrations except for the special Python file init.py

- Make migrations again
	Now you need to re-create the initial database migrations with the usual commands
	```
	$ python manage.py makemigrations
	```
