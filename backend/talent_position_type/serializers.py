from rest_framework import serializers
from talent_position_type.models import TalentPositionType

class TalentPositionTypeSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')
  position_type = serializers.SlugRelatedField(many=False, read_only=True, slug_field='name')
  position_type_id = serializers.IntegerField(
                        source='get_position_type_id',
                        read_only=True
                      )

  class Meta:
    model = TalentPositionType
    fields = ('id', 'talent', 'position_type', 'position_type_id')
