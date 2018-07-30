from rest_framework import serializers
from client_casting_request.models import ClientCastingRequest
from authentication.models import User
from authentication.serializers import GeneralUserSerializer

class ClientCastingRequestSerializer(serializers.ModelSerializer):
	user = GeneralUserSerializer(many=False, read_only=True) #User.StringRelatedField(many=False, read_only=True)

	class Meta:
		model = ClientCastingRequest
		fields = (
			'id',
			'user',
			'casting_request_name',
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
			'saved',
			'created'
		)
