from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.ClientCastingRequest)
class TalentClientCastingRequestAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client_id_display',
        'client_name_display',
        'casting_request_name',
        'ship_name',
        'employment_start_date',
        'employment_end_date',
        'talent_join_date',
        'rehearsal_start_date',
        'rehearsal_end_date',
        'performance_start_date',
        'performance_end_date',
        'visa_requirements',
        'comments',
        'created'
    )
    list_display_links = (
        'id',
        'client_id_display',
        'client_name_display',
        'casting_request_name',
        'ship_name',
        'employment_start_date',
        'employment_end_date',
        'talent_join_date',
        'rehearsal_start_date',
        'rehearsal_end_date',
        'performance_start_date',
        'performance_end_date',
        'visa_requirements',
        'comments',
        'created'
    )
    list_per_page = 25

    def client_id_display(self, obj):
        return obj.client.id

    def client_name_display(self, obj):
        return '{first_name} {last_name}'.format(
            first_name=obj.client.user.first_name,
            last_name=obj.client.user.last_name
        )

    client_id_display.short_description = 'Client ID'
    client_name_display.short_description = 'Client Name'