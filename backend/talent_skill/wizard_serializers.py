from rest_framework import serializers
from talent_skill.models import TalentSkill
from skill.wizard_serializers import WizardSkillSerializer
from sub_skill.wizard_serializers import WizardSubSkillSerializer


class WizardTalentSkillSerializer(serializers.ModelSerializer):
    skill = WizardSkillSerializer(many=False)
    sub_skills = WizardSubSkillSerializer(many=True)

    class Meta:
        model = TalentSkill
        fields = ('id', 'skill', 'sub_skills')
