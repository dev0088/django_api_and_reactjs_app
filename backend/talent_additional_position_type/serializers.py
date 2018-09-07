from rest_framework import serializers
from talent_additional_position_type.models import TalentAdditionalPositionType
from talent_position_type.serializers import TalentPositionTypeSerializer

class TalentAdditionalPositionTypeSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  talent_position_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentAdditionalPositionType
    fields = ('id', 'talent', 'talent_position_type')

class GeneralTalentAdditionalPositionTypeSerializer(serializers.ModelSerializer):
  """Serializers additional position types of talent."""
  talent_position_type = TalentPositionTypeSerializer(many=False) #serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentAdditionalPositionType
    fields = ['id', 'talent_position_type']
