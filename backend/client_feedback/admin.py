from django.contrib import admin
from . import models


@admin.register(models.ClientFeedback)
class CallBackAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_display',
        'feedback',
        'created'
    )
    list_display_links = (
        'id',
        'client_display',
        'feedback',
        'created'
    )
    list_per_page = 25

    def client_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.client.user.first_name,
            last_name=obj.client.user.last_name
        )

    client_display.short_description = 'Client'
