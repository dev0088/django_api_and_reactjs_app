from django.contrib import admin

# Register your models here.
from . import models
from rest_framework.authtoken.admin import TokenAdmin

admin.site.register(models.Talent)
