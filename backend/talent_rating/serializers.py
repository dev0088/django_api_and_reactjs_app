from rest_framework import serializers
from .models import TalentRating


class TalentRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = TalentRating
        fields = (
            'id',
            'talent',
            'rating',
            'comments',
            'client',
            'updated',
            'casting_request_talent'
        )
