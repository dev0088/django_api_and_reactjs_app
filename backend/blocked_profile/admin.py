from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.BlockedProfile)
class BlockedProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_display',
        'talent_display',
        'blocked_time',
        'description'
    )
    list_display_links = (
        'id',
        'client_display',
        'talent_display',
        'blocked_time',
        'description'
    )
    list_per_page = 25

    def client_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.client.user.first_name,
            last_name=obj.client.user.last_name
        )

    def talent_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.talent.user.first_name,
            last_name=obj.talent.user.last_name
        )

    client_display.short_description = 'Client'
    talent_display.short_description = 'Talent'
