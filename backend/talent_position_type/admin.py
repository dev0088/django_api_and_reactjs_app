from django.contrib import admin
from . import models
from talent_position_sub_type.models import TalentPositionSubType
from rest_framework.authtoken.admin import TokenAdmin

@admin.register(models.TalentPositionType)
class TalentPositionTypeAdmin(admin.ModelAdmin):
  list_display = ('id', 'talent_display', 
                  'talent_position_type_display', 
                  # 'talent_position_sub_types_display'
                  )
  list_display_links = ('id', )
  list_per_page = 25

  def talent_display(self, obj):
    return obj.talent.user.username

  talent_display.short_description = "Talent"


  def talent_position_type_display(self, obj):
    return obj.position_type.name

  talent_position_type_display.short_description = "Position type"

