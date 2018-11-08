from django.contrib import admin
from client.models import *


# Register your models here.

@admin.register(Talent)
class Talent(admin.ModelAdmin):
    list_display = ['name', 'sex', 'master_type']


@admin.register(CastingRequestModel)
class CastingRequest(admin.ModelAdmin):
    list_display = ['name', 'venue', 'status']
