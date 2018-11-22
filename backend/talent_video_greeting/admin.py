from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.TalentVideoGreeting)
class TalentVideoGreetingAdmin(admin.ModelAdmin):
        list_display = (
            'id',
            'user_email_display',
            'language',
            'priority',
            'file_type',
            'size',
            'url')
        list_display_links = (
            'id',
            'user_email_display',
            'priority',
            'language',
            'file_type',
            'size',
            'url')
        list_per_page = 25

        def user_email_display(self, obj):
            return obj.talent.user.email

        user_email_display.short_description = "Talent"

