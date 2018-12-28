from rest_framework import serializers
from .models import TalentRating


class TalentRatingCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = TalentRating
        fields = (
            'id',
            'talent',
            'rating',
            'comments',
            'client',
            'updated'
        )