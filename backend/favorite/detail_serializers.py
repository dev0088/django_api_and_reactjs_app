from rest_framework import serializers
from favorite.models import Favorite
from talent.simple_serializers import TalentSimpleSerializer


class FavoriteDetailSerializer(serializers.ModelSerializer):
    talent = TalentSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = Favorite
        fields = (
            'id',
            'client',
            'talent',
            'viewed_time'
        )
