from rest_framework import serializers
from talent_position_sub_type.models import TalentPositionSubType

class TalentPositionSubTypeSerializer(serializers.ModelSerializer):
  # talent_position_type = serializers.StringRelatedField(many=False, read_only=True)
  talent_position_type = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

  class Meta:
    model = TalentPositionSubType
    fields = ('id', 'name', 'talent_position_type')
