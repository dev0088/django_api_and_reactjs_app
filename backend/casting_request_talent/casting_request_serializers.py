from rest_framework import serializers
from casting_request_talent.models import CastingRequestTalent
from talent.casting_requst_serializers import TalentForCastingRequestSerializer


class CastingRequestTalentSerializer(serializers.ModelSerializer):
    talent = TalentForCastingRequestSerializer(many=False, read_only=True)

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
