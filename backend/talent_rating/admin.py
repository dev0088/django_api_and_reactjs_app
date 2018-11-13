from django.contrib import admin
from . import models


@admin.register(models.TalentRating)
class TalentRatingAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'talent_display',
        'rating',
        'client_display',
        'updated')

    list_display_links = (
        'id',
        'talent_display',
        'rating',
        'client_display',
        'updated')

    list_per_page = 25

    def talent_display(self, obj):
        return obj.talent.user.email

    def client_display(self, obj):
        return obj.client.user.email

    