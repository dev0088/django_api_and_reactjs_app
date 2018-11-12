from rest_framework import serializers
from authentication.serializers import GeneralUserSerializer
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


class TalentSearchConditionSerializer(serializers.Serializer):
    talent_name = serializers.CharField()
    talent_id = serializers.IntegerField()

#
# class TalentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Talent
#         fields = ('name', 'image', 'vda_number', 'role_description', 'comment', 'avg_rating')
#
#
# class RequestViewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CastingRequestModel
#         fields = ('pk', 'name', 'venue', 'start_date', 'end_date', 'status', 'request_date')
