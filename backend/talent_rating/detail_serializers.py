from rest_framework import serializers
from .models import TalentRating
from talent.simple_serializers import TalentSimpleSerializer


class TalentRatingDetailSerializer(serializers.ModelSerializer):
    talent = TalentSimpleSerializer(many=False)

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
