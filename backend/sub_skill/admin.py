from django.contrib import admin
from . import models

@admin.register(models.SubSkill)

class SubSkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'related_position_type_display', 'skill_display', 'name', 'priority', 'video_steps', 'max_video_time', 'download_video_link', 'description')
    list_display_links = ('id', 'name', 'video_steps', 'max_video_time', 'download_video_link', 'description')
    list_per_page = 25

    def related_position_type_display(self, obj):
        return obj.skill.related_position_type.name

    def skill_display(self, obj):
        return obj.skill.name

    related_position_type_display.short_description = "Position"
    skill_display.short_description = "Skill"

