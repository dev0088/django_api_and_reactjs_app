from django.contrib import admin
from . import models

@admin.register(models.PositionSubType)

class PositionSubTypeAdmin(admin.ModelAdmin):
  list_display = ('id', 'name', 'position_type_display')
  list_display_links = ('id', 'name')
  list_per_page = 25

  def position_type_display(self, obj):
    return obj.position_type.name

  position_type_display.short_description = "Position type"

