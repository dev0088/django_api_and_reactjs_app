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


class TalentSearchAvailabilityConditionSerializer(serializers.Serializer):
    start_date = serializers.CharField(required=False)
    end_date = serializers.CharField(required=False)


class TalentSearchRatingConditionSerializer(serializers.Serializer):
    start_rating = serializers.FloatField(required=False)
    end_rating = serializers.FloatField(required=False)


class TalentSearchHeightConditionSerializer(serializers.Serializer):
    start_height = serializers.FloatField(required=False)
    end_height = serializers.FloatField(required=False)


class TalentSearchConditionSerializer(serializers.Serializer):
    talent_name = serializers.CharField(required=False)
    talent_id = serializers.IntegerField(required=False)
    talent_tid = serializers.CharField(required=False)
    talent_name_or_tid = serializers.CharField(required=False)
    casting_request_id = serializers.IntegerField(required=False)
    sexes = serializers.ListField(child=serializers.CharField(), required=False)
    position_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
    position_sub_type_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
    skill_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
    sub_skill_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
    availability = TalentSearchAvailabilityConditionSerializer(required=False)
    ages = serializers.ListField(child=serializers.IntegerField(), required=False)
    heights = serializers.ListField(child=TalentSearchHeightConditionSerializer(), required=False)
    languages = serializers.ListField(child=serializers.CharField(), required=False)
    ratings = serializers.ListField(child=TalentSearchRatingConditionSerializer(), required=False)



