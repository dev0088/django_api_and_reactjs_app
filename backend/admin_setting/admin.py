from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

# admin.site.register(models.AdminSetting)

@admin.register(models.AdminSetting)
class AdminSettingAdmin(admin.ModelAdmin):
  list_display = ('id', 'video_interview_prep_countdown', 
                  'video_interview_response_time')
  list_display_links = ('id', 'video_interview_prep_countdown', 'video_interview_response_time')
  list_per_page = 25
