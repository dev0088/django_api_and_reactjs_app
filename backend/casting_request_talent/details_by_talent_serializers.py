from rest_framework import serializers
from casting_request_talent.models import CastingRequestTalent
from casting_request.general_by_talent_serializers import CastingRequestGeneralByTalentSerializer


class CastingRequestTalentDetailByTalentSerializer(serializers.ModelSerializer):
    casting_request = CastingRequestGeneralByTalentSerializer(many=False)

    class Meta:
        model = CastingRequestTalent
        fields = (
            'id',
            'casting_request',
            'talent',
            'rehearsal_wage',
            'performance_wage',
            'comment',
            'created'
        )
