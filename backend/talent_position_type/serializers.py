from rest_framework import serializers
from talent_position_type.models import TalentPositionType
# from talent_position_sub_type.models import TalentPositionSubType

class TalentPositionTypeSerializer(serializers.ModelSerializer):
  talent_position_sub_types = serializers.SlugRelatedField(
                                many=True,
                                read_only=True,
                                slug_field='name'
                              )

  class Meta:
    model = TalentPositionType
    fields = ('name', 'talent_position_sub_types')
