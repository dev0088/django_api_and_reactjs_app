#!/bin/bash

NAME="config"                              				#Name of the application (*)
DJANGODIR=/home/centos/shiptalent/backend    # Django project directory (*)
SOCKFILE=/home/centos/shiptalent/backend/run/gunicorn.sock        # we will communicate using this unix socket (*)
USER=centos                                        # the user to run as (*)
GROUP=nginx                                     # the group to run as (*)
NUM_WORKERS=1                                     # how many worker processes should Gunicorn spawn (*)
DJANGO_SETTINGS_MODULE=config.settings             # which settings file should Django use (*)
DJANGO_WSGI_MODULE=config.wsgi                     # WSGI module name (*)

echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source /home/centos/shiptalent/backend/env3/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec /home/centos/shiptalent/backend/env3/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user $USER \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-
#exec gunicorn config.wsgi:application --name "config" --workers 1 --user nginx --bind=unix:/home/centos/shiptalent/backend/run/gunicorn.sock
