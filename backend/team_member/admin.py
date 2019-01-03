from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_display',
        'member_email_display',
        'created'
    )
    list_display_links = (
        'id',
        'client_display',
        'member_email_display',
        'created'
    )
    list_per_page = 25

    def client_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.team.client.user.first_name,
            last_name=obj.team.client.user.last_name
        )

    def member_email_display(self, obj):
        return obj.member_email

    client_display.short_description = 'Client'
    member_email_display.short_description = 'Member'
