from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.Talent)
class TalentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user_id_display',
        'user_email_display',
        'sex',
        'tid'
    )
    list_display_links = (
        'id',
        'user_id_display',
        'user_email_display',
        'sex',
        'tid'
    )
    list_per_page = 25

    def user_id_display(self, obj):
        return obj.user.id

    def user_email_display(self, obj):
        return obj.user.email

    def skill_display(self, obj):
        return obj.skill.name

    skill_display.short_description = "Skill"

