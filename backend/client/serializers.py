from rest_framework import serializers
from authentication.serializers import GeneralUserSerializer
from casting_request.serializers import CastingRequestSerializer
from team.create_serializers import TeamCreateSerializer
from team.serializers import TeamSerializer
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
    client_teams = TeamSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = (
            'id',
            'user',
            'created',
            'casting_requests',
            'client_teams'
        )


class TalentSearchConditionSerializer(serializers.Serializer):
    talent_name = serializers.CharField()
    talent_id = serializers.IntegerField()
    talent_tid = serializers.CharField()
    talent_name_or_tid = serializers.CharField()
    casting_request_id = serializers.IntegerField()

