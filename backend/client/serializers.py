from rest_framework import serializers
from client.models import *


class TalentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talent
        fields = ('name', 'image', 'vda_number', 'role_description', 'comment', 'avg_rating')


class RequestViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = CastingRequestModel
        fields = ('pk', 'name', 'venue', 'start_date', 'end_date', 'status', 'request_date')
