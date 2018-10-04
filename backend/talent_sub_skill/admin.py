from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin

class TalentSubSkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'talent', 'get_skill', 'get_sub_skill')
    list_display_links = ('id', 'talent', 'get_skill', 'get_sub_skill')
    list_per_page = 25

admin.site.register(models.TalentSubSkill, TalentSubSkillAdmin)
