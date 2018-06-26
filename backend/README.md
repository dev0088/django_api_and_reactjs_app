================================
Python/Django + JWT auth backend
================================

### Technical Stack

	- Python/Django: python 3.6,

	- Database: PostgreSQL

	- JWT auth based RESTful API

### Build server

	```
	$ python3.6 -m venv env3
	$ source env3/bin/activate
	$ pip install coreapi django djangorestframework djangorestframework-simplejwt
	$ pip freeze > requirements.txt
	$ django-admin startproject config .
	```