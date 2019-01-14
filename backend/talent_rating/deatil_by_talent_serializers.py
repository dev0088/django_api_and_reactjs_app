from rest_framework import serializers
from .models import TalentRating
from client.serializers import ClientSerializer
from casting_request_talent.details_by_talent_serializers import CastingRequestTalentDetailByTalentSerializer


class TalentRatingDetailByTalentSerializer(serializers.ModelSerializer):
    client = ClientSerializer(many=False)
    casting_request_talent = CastingRequestTalentDetailByTalentSerializer(many=False)

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
