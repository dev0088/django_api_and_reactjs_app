from rest_framework import serializers
from sub_skill.models import SubSkill


class WizardSubSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubSkill
        fields = (
            'id',
            'name',
        )
