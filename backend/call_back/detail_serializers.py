from rest_framework import serializers
from call_back.models import CallBack
from talent.simple_serializers import TalentSimpleSerializer


class CallBackDetailSerializer(serializers.ModelSerializer):
    talent = TalentSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = CallBack
        fields = (
            'id',
            'client',
            'talent',
            'created'
        )
