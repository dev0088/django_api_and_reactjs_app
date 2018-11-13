from django.contrib import admin
from client.models import *


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id',
                  'user_id_display',
                  'user_email_display')
    list_display_links = ('id',
                  'user_id_display',
                  'user_email_display')
    list_per_page = 25

    def user_id_display(self, obj):
        return obj.user.id

    def user_email_display(self, obj):
        return obj.user.email

    def skill_display(self, obj):
        return obj.skill.name

    skill_display.short_description = "Skill"
#
# @admin.register(Talent)
# class Talent(admin.ModelAdmin):
#     list_display = ['name', 'sex', 'master_type']
#
#
# @admin.register(CastingRequestModel)
# class CastingRequest(admin.ModelAdmin):
#     list_display = ['name', 'venue', 'status']
