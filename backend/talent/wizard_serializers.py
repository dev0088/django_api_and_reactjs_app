from rest_framework import serializers
from talent.models import Talent
from talent_position_type.wizard_serializers import WizardTalentPositionTypeSerializer
from talent_skill.wizard_serializers import WizardTalentSkillSerializer


class WizardTalentInfoSerializer(serializers.ModelSerializer):
    talent_position_types = WizardTalentPositionTypeSerializer(many=True)
    talent_skills = WizardTalentSkillSerializer(many=True)

    class Meta:
        model = Talent
        fields = (
            'id',
            'talent_position_types',
            'talent_skills',
        )
