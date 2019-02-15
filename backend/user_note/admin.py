from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.UserNote)
class UserNoteAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'creator',
        'actor_display',
        'receiver_display',
        'note_type',
        'note',
        'object_type',
        'object_id',
        'created',
        'updated'
    )
    list_display_links = (
        'id',
        'creator',
        'actor_display',
        'receiver_display',
        'note_type',
        'note',
        'object_type',
        'object_id',
        'created',
        'updated'
    )
    list_per_page = 25

    def actor_display(self, obj):
        return obj.actor.email

    def receiver_display(self, obj):
        return obj.receiver.email

    actor_display.short_description = "Actor"
    receiver_display.short_description = "Receiver"

