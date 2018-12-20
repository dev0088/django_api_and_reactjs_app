from rest_framework import serializers
from authentication.serializers import GeneralUserSerializer
from client.models import *


class ClientSerializer(serializers.ModelSerializer):
    user = GeneralUserSerializer(many=False, read_only=True)

    class Meta:
        model = Client
        fields = (
            'id',
            'user',
            'created'
        )
