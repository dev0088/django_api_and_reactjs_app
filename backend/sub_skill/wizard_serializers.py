from rest_framework import serializers
from sub_skill.models import SubSkill
from skill.wizard_serializers import WizardSkillSerializer


class WizardSubSkillSerializer(serializers.ModelSerializer):
    skill = WizardSkillSerializer(many=False)

    class Meta:
        model = SubSkill
        fields = (
            'id',
            'name',
            'abbreviated_key',
            'caption',
            'priority',
            'skill',
            'wizard_button_title',
            'select_option_title',
            'agent_title',
        )
