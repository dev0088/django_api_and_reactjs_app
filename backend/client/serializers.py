from rest_framework import serializers
from authentication.serializers import GeneralUserSerializer
from client_casting_request.serializers import ClientCastingRequestSerializer
from client.models import *
from talent.models import *
from drf_yasg.utils import swagger_serializer_method


class ClientSerializer(serializers.ModelSerializer):
    user = GeneralUserSerializer(many=False, read_only=True)

    class Meta:
        model = Client
        fields = (
            'id',
            'user',
            'created'
        )


class ClientAllInfoSerializer(serializers.ModelSerializer):
    user = GeneralUserSerializer(many=False, read_only=True)
    client_casting_requests = ClientCastingRequestSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = (
            'id',
            'user',
            'created',
            'client_casting_requests'
        )


class TalentSearchConditionSerializer(serializers.Serializer):
    talent_name = serializers.CharField()
    talent_id = serializers.IntegerField()

