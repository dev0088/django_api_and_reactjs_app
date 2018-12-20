from rest_framework import serializers
from casting_request.models import CastingRequest
from casting_request_talent.casting_request_serializers import CastingRequestTalentSerializer
from client.serializers import ClientSerializer


class CastingRequestDetailSerializer(serializers.ModelSerializer):
    client = ClientSerializer(many=False, read_only=True)
    casting_request_talents = CastingRequestTalentSerializer(many=True, read_only=True)

    class Meta:
        model = CastingRequest
        fields = (
            'id',
            'client',
            'name',
            'ship_name',
            'employment_start_date',
            'employment_end_date',
            'talent_join_date',
            'rehearsal_start_date',
            'rehearsal_end_date',
            'performance_start_date',
            'performance_end_date',
            'visa_requirements',
            'comments',
            'status',
            'status_updated_date',
            'saved',
            'created',
            'casting_request_talents',
        )
