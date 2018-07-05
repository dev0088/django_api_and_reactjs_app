#!/bin/bash

sudo systemctl enable gunicorn_shiptalentbackend
sudo systemctl start gunicorn_shiptalentbackend
sudo systemctl status gunicorn_shiptalentbackend

