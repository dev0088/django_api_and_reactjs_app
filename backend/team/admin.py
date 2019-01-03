from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_display',
        'name',
        'created'
    )
    list_display_links = (
        'id',
        'client_display',
        'name',
        'created'
    )
    list_per_page = 25

    def client_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.client.user.first_name,
            last_name=obj.client.user.last_name
        )

    client_display.short_description = 'Owner'
