from django.contrib import admin
from . import models

@admin.register(models.TalentPositionSubType)

class TalentPositionSubTypeAdmin(admin.ModelAdmin):
  list_display = ('id', 'talent_display', 
                  'talent_position_type_display',
                  'talent_position_sub_type_display')
  list_display_links = ('id', 'talent_display', 
                  'talent_position_type_display',
                  'talent_position_sub_type_display')
  list_per_page = 25

  def talent_display(self, obj):
    return obj.talent.user.username

  talent_display.short_description = "Talent"


  def talent_position_sub_type_display(self, obj):
    return obj.position_sub_type.name

  talent_position_sub_type_display.short_description = "Position sub type"

  def talent_position_type_display(self, obj):
    return obj.position_sub_type.position_type.name

  talent_position_type_display.short_description = "Position type"

