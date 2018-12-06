from django.contrib import admin
from . import models


@admin.register(models.WizardQuestionAnswer)
class WizardQuestionAnswerAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'wizard_question_display',
        'priority',
        'position_sub_type_display',
        'sub_skill_display',
        'is_sub_skill',
        'is_skippable'
    )
    list_display_links = (
        'id',
        'priority',
        'position_sub_type_display',
        'sub_skill_display',
        'wizard_question_display'
    )
    list_per_page = 25

    def sub_skill_display(self, obj):
        return obj.sub_skill.wizard_button_title if obj.sub_skill else ''

    def position_sub_type_display(self, obj):
        return obj.position_sub_type.wizard_button_title if obj.position_sub_type else ''

    def wizard_question_display(self, obj):
        return obj.wizard_question.question if obj.wizard_question else ''

    sub_skill_display.short_description = "Sub Skill"
    position_sub_type_display.short_description = "Sub Position"
    wizard_question_display.short_description = "Wizard Question"

