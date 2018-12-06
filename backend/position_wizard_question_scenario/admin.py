from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.PositionWizardQuestionScenario)
class PositionWizardQuestionScenarioAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'position_type_display', 'priority', 'wizard_question_display', 'skippable_step'
    )
    list_display_links = ('id', 'position_type_display', 'priority', 'wizard_question_display', 'skippable_step')
    list_per_page = 25

    def position_type_display(self, obj):
        return obj.position_type.wizard_button_title if obj.position_type else ''

    def wizard_question_display(self, obj):
        return obj.wizard_question.question if obj.wizard_question else ''

    position_type_display.short_description = "Position Type"
    wizard_question_display.short_description = "Wizard Question"
