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
            'caption',
            'priority',
            'skill',
            'wizard_button_title',
        )
