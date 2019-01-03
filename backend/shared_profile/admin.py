from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.SharedProfile)
class SharedProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_display',
        'team_member_display',
        'talent_display',
        'comment',
        'created'
    )
    list_display_links = (
        'id',
        'client_display',
        'team_member_display',
        'talent_display',
        'comment',
        'created'
    )
    list_per_page = 25

    def client_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.team_member.team.client.user.first_name,
            last_name=obj.team_member.team.client.user.last_name
        )

    def team_member_display(self, obj):
        return '{member_email}'.format(
            member_email=obj.team_member.member_email
        )

    def talent_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.talent.user.first_name,
            last_name=obj.talent.user.last_name
        )

    client_display.short_description = 'Client'
    team_member_display.short_description = 'Team Member'
    talent_display.short_description = 'Shared Talent'
