from rest_framework import serializers
from talent_position_type.models import TalentPositionType
from talent_position_sub_type.serializers import TalentPositionSubTypeSerializer
from position_type.wizard_serializers import WizardPositionTypeSerializer
from position_sub_type.wizard_serializers import WizardPositionSubTypeSerializer


class WizardTalentPositionTypeSerializer(serializers.ModelSerializer):
    position_type = WizardPositionTypeSerializer(many=False)
    position_sub_types = WizardPositionSubTypeSerializer(many=True)

    class Meta:
        model = TalentPositionType
        fields = ('id', 'position_type', 'position_sub_types')
