from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.CastingRequestTalent)
class CastingRequestTalentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'casting_request_display',
        'talent_display',
        'rehearsal_wage',
        'performance_wage',
        'comment',
        'created'
    )
    list_display_links = (
        'id',
        'casting_request_display',
        'talent_display',
        'rehearsal_wage',
        'performance_wage',
        'comment',
        'created'
    )
    list_per_page = 25

    def casting_request_display(self, obj):
        return obj.casting_request.name

    def talent_display(self, obj):

        return '{first_name} {last_name}'.format(
            first_name=obj.talent.user.first_name,
            last_name=obj.talent.user.last_name
        )

    casting_request_display.short_description = 'Casting Request'
    # talents_display.short_description = 'Talents'
