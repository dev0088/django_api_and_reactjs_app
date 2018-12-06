from django.contrib import admin
from . import models
from rest_framework.authtoken.admin import TokenAdmin


@admin.register(models.WizardQuestion)
class WizardQuestionAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'question', 'multi_selection', 'selection_title', 'wizard_question_answers_display',
    )
    list_display_links = ('id', 'name', 'question', 'selection_title', 'wizard_question_answers_display')
    list_filter = ('name', 'question', 'multi_selection')
    list_per_page = 25

    def wizard_question_answers_display(self, obj):
        names = []
        for answer in obj.wizard_question_answers.all():
            name = ''
            if answer.is_sub_skill:
                name = answer.sub_skill.wizard_button_title if answer.sub_skill else ''
            else:
                name = answer.position_sub_type.wizard_button_title if answer.position_sub_type else ''

            names.append(name)

        return ", ".join(names)

    wizard_question_answers_display.short_description = "Answers"
