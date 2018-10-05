from django.contrib import admin
from . import models
from talent_sub_skill.models import TalentSubSkill
from rest_framework.authtoken.admin import TokenAdmin

@admin.register(models.TalentSkill)
class TalentSkillAdmin(admin.ModelAdmin):
  list_display = ('id', 'talent_display', 'skill_display', 'sub_skills_display')
  list_display_links = ('id', 'talent_display', 'skill_display', 'sub_skills_display')
  list_per_page = 25

  def talent_display(self, obj):
    return obj.talent.user.username

  talent_display.short_description = "Talent"


  def skill_display(self, obj):
    return obj.skill.name

  skill_display.short_description = "Skill"


  def sub_skills_display(self, obj):
    return ", ".join([
        talent_sub_skills.sub_skill.name for talent_sub_skills in TalentSubSkill.objects.filter(talent=obj.talent)
    ])

  sub_skills_display.short_description = "Sub skills"
