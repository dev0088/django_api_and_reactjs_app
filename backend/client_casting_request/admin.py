from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

class TalentClientCastingRequestAdmin(admin.ModelAdmin):
    list_display = (...,)
    list_display_links = ('id', )
    list_per_page = 25

admin.site.register(models.ClientCastingRequest)
