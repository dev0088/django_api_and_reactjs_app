from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.TalentAvailability)
class TalentAvailabilityAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'talent_display', 
        'start_date', 
        'end_date',
        'updated_at'
    )
    
    list_display_links = (
        'id', 
        'talent_display', 
        'start_date', 
        'end_date',
        'updated_at'
    )

    list_per_page = 25

    def talent_display(self, obj):
        return obj.talent.user.username

    talent_display.short_description = "Talent"




