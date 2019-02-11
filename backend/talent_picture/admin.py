from django.contrib import admin
from . import models

@admin.register(models.TalentPicture)
class TalentPictureAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'talent',
        'caption',
        'priority',
        'url',
        'approved',
        'path',
        'size',
        'file_type',
        'updated'
    )
    list_display_links = ('id', 'caption')
    list_per_page = 25

