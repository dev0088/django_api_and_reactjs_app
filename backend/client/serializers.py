from rest_framework import serializers
from authentication.serializers import GeneralUserSerializer
from casting_request.serializers import CastingRequestSerializer
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
    casting_requests = CastingRequestSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = (
            'id',
            'user',
            'created',
            'casting_requests'
        )


class TalentSearchConditionSerializer(serializers.Serializer):
    talent_name = serializers.CharField()
    talent_id = serializers.IntegerField()

