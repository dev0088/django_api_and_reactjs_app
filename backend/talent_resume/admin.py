from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.TalentResume)
class TalentResumeAdmin(admin.ModelAdmin):
    list_display = ('id',
                    'user_id_display',
                    'talent_id_display',
                    'name',
                    'url',
                    'preview_path',
                    'size',
                    'file_type',
                    'updated')

    list_display_links = ('id',
                          'user_id_display',
                          'talent_id_display',
                          'name',
                          'url',
                          'preview_path',
                          'size',
                          'file_type',
                          'updated')
    list_per_page = 25

    def user_id_display(self, obj):
        return obj.talent.user.id

    def talent_id_display(self, obj):
        return obj.talent.id

    user_id_display.short_description = "User ID"
    talent_id_display.short_description = "Talent ID"

