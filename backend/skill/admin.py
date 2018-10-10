from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

admin.site.register(models.Skill)
