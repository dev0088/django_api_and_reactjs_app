from rest_framework import serializers
from talent_sub_skill.models import TalentSubSkill
from sub_skill.wizard_serializers import WizardSubSkillSerializer


class WizardTalentSubSkillSerializer(serializers.ModelSerializer):
    sub_skill = WizardSubSkillSerializer(many=False)

    class Meta:
        model = TalentSubSkill
        fields = ('id', 'sub_skill')
