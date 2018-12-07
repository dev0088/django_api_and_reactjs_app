from django.contrib import admin
from . import models


@admin.register(models.SubSkill)
class SubSkillAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'related_position_type_display', 'skill_display', 'name',
        'select_option_title', 'wizard_button_title', 'video_audition_button_title', 'priority', 'opts_in',
        'video_audition_type', 'video_counts', 'max_video_time',
        'is_special_video_audition', 'is_required_all', 'is_required', 'is_video_interview_button'
    )
    list_display_links = (
        'id', 'name', 'priority', 'opts_in', 'video_audition_type', 'video_audition_button_title', 'video_counts',
        'select_option_title', 'wizard_button_title', 'max_video_time',
        'is_special_video_audition', 'is_required_all', 'is_required', 'is_video_interview_button'
    )
    list_per_page = 25

    def related_position_type_display(self, obj):
        return obj.skill.related_position_type.name

    def skill_display(self, obj):
        return obj.skill.name

    related_position_type_display.short_description = "Position"
    skill_display.short_description = "Skill"

