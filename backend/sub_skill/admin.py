from django.contrib import admin
from . import models

@admin.register(models.SubSkill)

class SubSkillAdmin(admin.ModelAdmin):
  list_display = ('id', 'skill_display', 'name')
  list_display_links = ('id', 'name')
  list_per_page = 25

  def skill_display(self, obj):
    return obj.skill.name

  skill_display.short_description = "Skill"

