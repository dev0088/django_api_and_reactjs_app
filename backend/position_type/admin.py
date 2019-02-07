from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.PositionType)
class TalentPositionTypeAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'abbreviated_key', 'priority', 'multi_selection', 'sub_position_display',
        'select_option_title', 'wizard_button_title', 'video_audition_button_title', 'agent_title',
        'question', 'introduction_link')
    list_display_links = ('id', 'name', 'abbreviated_key', 'video_audition_button_title', 'wizard_button_title', 'introduction_link')
    list_filter = ('multi_selection',)
    list_per_page = 25

    def sub_position_display(self, obj):
        return ", ".join([
                position_sub_type.name for position_sub_type in obj.position_sub_types.all()
        ])

    sub_position_display.short_description = "Sub postions"

