from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

class TalentPictureAdmin(admin.ModelAdmin):
    list_display = ('id', 'talent', 'url', 'path', 'size', 'file_type', 'updated')
    list_display_links = ('id', )
    list_per_page = 25

admin.site.register(models.TalentPicture, TalentPictureAdmin)
