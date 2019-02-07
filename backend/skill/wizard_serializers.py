from rest_framework import serializers
from skill.models import Skill


class WizardSkillSerializer(serializers.ModelSerializer):
    related_position_type = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = Skill
        fields = (
            'id',
            'name',
            'abbreviated_key',
            'priority',
            'multi_selection',
            'related_position_type',
            'wizard_button_title',
            'select_option_title',
            'agent_title',
            'question',
        )
