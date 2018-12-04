from rest_framework import serializers
from position_type.models import PositionType
from position_sub_type.serializers import PositionSubTypeSerializer


class PositionTypeSerializer(serializers.ModelSerializer):
    # position_sub_types = serializers.SlugRelatedField(
    #                       many=True,
    #                       read_only=True,
    #                       slug_field='name'
    #                     )
    position_sub_types = PositionSubTypeSerializer(many=True)
    
    class Meta:
        model = PositionType
        fields = (
            'id',
            'name',
            'priority',
            'multi_selection',
            'position_sub_types',
            'video_audition_button_title',
            'wizard_button_title',
            'question'
        )


class PositionTypeNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = PositionType
        fields = ('name',)
