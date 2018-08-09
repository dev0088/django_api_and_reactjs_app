from rest_framework import serializers
from talent_additional_position_sub_type.models import TalentAdditionalPositionSubType
from talent_position_sub_type.serializers import TalentPositionSubTypeSerializer

class TalentAdditionalPositionSubTypeSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  talent_position_sub_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentAdditionalPositionSubType
    fields = ('id', 'talent', 'talent_position_sub_type')

class GeneralTalentAdditionalPositionSubTypeSerializer(serializers.ModelSerializer):
  """Serializers additional position suby types of talent."""
  talent_position_sub_type = TalentPositionSubTypeSerializer(many=False)#serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentAdditionalPositionSubType
    fields = ['id', 'talent_position_sub_type']
