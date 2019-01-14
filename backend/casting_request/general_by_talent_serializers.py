from rest_framework import serializers
from casting_request.models import CastingRequest


class CastingRequestGeneralByTalentSerializer(serializers.ModelSerializer):

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
        )
