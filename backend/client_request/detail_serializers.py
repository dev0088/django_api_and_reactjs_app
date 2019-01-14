from rest_framework import serializers
from client_request.models import ClientRequest
from client.general_serializers import ClientSerializer
from talent.simple_serializers import TalentSimpleSerializer


class ClientRequestDetailSerializer(serializers.ModelSerializer):
    client = ClientSerializer(many=False, read_only=True)
    talent = TalentSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = ClientRequest
        fields = (
            'id',
            'client',
            'talent',
            'request',
            'created'
        )
