from rest_framework import serializers
from .models import TalentRating
from talent.simple_serializers import TalentSimpleSerializer
from casting_request_talent.serializers import CastingRequestTalentSerializer


class TalentRatingDetailSerializer(serializers.ModelSerializer):
    talent = TalentSimpleSerializer(many=False)
    casting_request_talent = CastingRequestTalentSerializer(many=False)

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
