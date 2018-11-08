from rest_framework import serializers
from position_type.models import PositionType

class PositionTypeSerializer(serializers.ModelSerializer):
  position_sub_types = serializers.SlugRelatedField(
                          many=True,
                          read_only=True,
                          slug_field='name'
                        )

  class Meta:
    model = PositionType
    fields = ('name', 'multi_selection', 'position_sub_types', 'question')


class PositionTypeNameSerializer(serializers.ModelSerializer):

  class Meta:
    model = PositionType
    fields = ('name')