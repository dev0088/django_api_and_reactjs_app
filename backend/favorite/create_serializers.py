from rest_framework import serializers
from favorite.models import Favorite


class FavoriteCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorite
        fields = (
            'id',
            'talent'
        )
