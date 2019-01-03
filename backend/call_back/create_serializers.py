from rest_framework import serializers
from call_back.models import CallBack


class CallBackCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CallBack
        fields = (
            'id',
            'talent'
        )
