from django.contrib import admin
from . import models


@admin.register(models.TalentRating)
class TalentRatingAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'talent_display',
        'rating',
        'client_display',
        'casting_request_talent_display',
        'updated')

    list_display_links = (
        'id',
        'talent_display',
        'rating',
        'client_display',
        'casting_request_talent_display',
        'updated')

    list_per_page = 25

    def talent_display(self, obj):
        return obj.talent.user.email

    def client_display(self, obj):
        return obj.client.user.email

    def casting_request_talent_display(self, obj):
        return obj.casting_request_talent.casting_request.name

    talent_display.short_description = "Talent"
    client_display.short_description = "Client"
    casting_request_talent_display.short_description = "Casting Request"