from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.TalentVideoSubSkill)
class TalentVideoSubSkillAdmin(admin.ModelAdmin):
        list_display = (
            'id',
            'user_email_display',
            'sub_skill_display',
            'file_type',
            'size',
            'url')
        list_display_links = (
            'id',
            'user_email_display',
            'sub_skill_display',
            'file_type',
            'size',
            'url')
        list_per_page = 25

        def sub_skill_display(self, obj):
            return obj.sub_skill.name

        def user_email_display(self, obj):
            return obj.talent.user.email

        user_email_display.short_description = "Talent"
        sub_skill_display.short_description = "Sub Skill"

