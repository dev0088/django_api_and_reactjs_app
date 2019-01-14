from rest_framework import serializers
from client_request.models import ClientRequest


class ClientRequestCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClientRequest
        fields = (
            'id',
            'talent',
            'request'
        )
