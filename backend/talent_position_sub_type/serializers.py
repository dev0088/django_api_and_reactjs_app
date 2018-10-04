from rest_framework import serializers
from talent_position_sub_type.models import TalentPositionSubType
from position_sub_type.serializers import PositionSubTypeSerializer


class TalentPositionSubTypeSerializer(serializers.ModelSerializer):
  # talent_position_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  position_sub_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentPositionSubType
    fields = ('id', 'talent', 'position_sub_type')

class GeneralTalentPositionSubTypeSerializer(serializers.ModelSerializer):
  """Serializers additional position suby types of talent."""
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  position_sub_type = PositionSubTypeSerializer(many=False)

  class Meta:
    model = TalentPositionSubType
    fields = ['id', 'talent','position_sub_type']
