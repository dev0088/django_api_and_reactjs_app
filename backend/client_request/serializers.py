from rest_framework import serializers
from client_request.models import ClientRequest


class ClientRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClientRequest
        fields = (
            'id',
            'client',
            'talent',
            'request',
            'created'
        )
