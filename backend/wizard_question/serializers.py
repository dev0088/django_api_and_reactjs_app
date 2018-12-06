from rest_framework import serializers
from wizard_question.models import WizardQuestion
from wizard_question_answer.serializers import WizardQuestionAnswerSerializer


class WizardQuestionSerializer(serializers.ModelSerializer):
    wizard_question_answers = WizardQuestionAnswerSerializer(many=True)

    class Meta:
        model = WizardQuestion
        fields = (
            'id',
            'name',
            'question',
            'multi_selection',
            'selection_title',
            'wizard_question_answers'
        )
