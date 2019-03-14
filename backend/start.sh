#!/bin/sh
python /shiptalent/backend/manage.py collectstatic --noinput
#/usr/local/bin/gunicorn django_config.wsgi -w 4 -b 0.0.0.0:8000 --chdir=/shiptalent/backend
python manage.py makemigrations 
python manage.py migrate
python manage.py runserver 0.0.0.0:8000