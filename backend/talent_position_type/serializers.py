from rest_framework import serializers
from talent_position_type.models import TalentPositionType
# from talent_position_sub_type.models import TalentPositionSubType

class TalentPositionTypeSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  position_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')

  class Meta:
    model = TalentPositionType
    fields = ('id', 'talent', 'position_type')
