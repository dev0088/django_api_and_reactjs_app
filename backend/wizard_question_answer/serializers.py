from rest_framework import serializers
from wizard_question_answer.models import WizardQuestionAnswer
from sub_skill.wizard_serializers import WizardSubSkillSerializer
from position_sub_type.wizard_serializers import WizardPositionSubTypeSerializer


class WizardQuestionAnswerSerializer(serializers.ModelSerializer):
    sub_skill = WizardSubSkillSerializer(many=False) #serializers.SlugRelatedField(many=False, read_only=True, slug_field='wizard_button_title')
    position_sub_type = WizardPositionSubTypeSerializer(many=False) #serializers.SlugRelatedField(many=False, read_only=True, slug_field='wizard_button_title')

    class Meta:
        model = WizardQuestionAnswer
        fields = (
            'id',
            'priority',
            'wizard_question',
            'sub_skill',
            'position_sub_type',
            'is_sub_skill',
            'is_skippable'
        )
