from django.contrib import admin

# Register your models here.
from . import models
from rest_framework.authtoken.admin import TokenAdmin

@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
  list_display = ('id', 'position_type_display', 
                  'position_sub_type_display', 
                  'content',
                  'created')

  list_display_links = ('id', 'position_type_display', 
                  'position_sub_type_display', 
                  'content',
                  'created')
  list_per_page = 25


  def position_type_display(self, obj):
    return obj.position_type.name

  position_type_display.short_description = "Position type"


  def position_sub_type_display(self, obj):
    if obj.position_sub_type:
      return obj.position_sub_type.name
    else: 
      return ""

  position_sub_type_display.short_description = "Postion sub type"
