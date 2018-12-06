from rest_framework import serializers
from position_wizard_question_scenario.models import PositionWizardQuestionScenario
from position_type.serializers import PositionSubTypeSerializer
from wizard_question.serializers import WizardQuestionSerializer


class PositionWizardQuestionScenarioSerializer(serializers.ModelSerializer):
    position_type = PositionSubTypeSerializer(many=False)
    wizard_question = WizardQuestionSerializer(many=False)

    class Meta:
        model = PositionWizardQuestionScenario
        fields = (
            'id',
            'position_type',
            'priority',
            'wizard_question',
            'skippable_step'
        )
