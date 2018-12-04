from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

@admin.register(models.PositionType)

class TalentPositionTypeAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'priority', 'multi_selection', 'sub_position_display', 'video_audition_button_title',
        'wizard_button_title', 'question')
    list_display_links = ('id', 'name', 'video_audition_button_title', 'wizard_button_title')
    list_filter = ('multi_selection',)
    list_per_page = 25

    def sub_position_display(self, obj):
        return ", ".join([
                position_sub_type.name for position_sub_type in obj.position_sub_types.all()
        ])

    sub_position_display.short_description = "Sub postions"

