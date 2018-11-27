from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

@admin.register(models.Skill)

class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'priority', 'multi_selection', 'related_position_type', 'sub_skill_display', 'question')
    list_display_links = ('id', 'name', 'priority')
    list_filter = ('multi_selection',)
    list_per_page = 25

    def sub_skill_display(self, obj):
        return ", ".join([
            sub_skill.name for sub_skill in obj.sub_skills.all()
        ])

    sub_skill_display.short_description = "Sub skills"