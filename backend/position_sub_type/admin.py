from django.contrib import admin
from . import models


@admin.register(models.PositionSubType)
class PositionSubTypeAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'position_type_display', 'name', 'abbreviated_key', 'priority',
        'select_option_title', 'wizard_button_title', 'video_audition_button_title',
        'agent_title',
        )
    list_display_links = (
        'id', 'position_type_display', 'name', 'priority', 'video_audition_button_title',
        'wizard_button_title', 'agent_title',)

    list_per_page = 25

    def position_type_display(self, obj):
        return obj.position_type.name

    position_type_display.short_description = "Position type"

