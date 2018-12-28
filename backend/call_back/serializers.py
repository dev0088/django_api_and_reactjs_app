from rest_framework import serializers
from call_back.models import CallBack


class CallBackSerializer(serializers.ModelSerializer):

    class Meta:
        model = CallBack
        fields = (
            'id',
            'client',
            'talent',
            'created'
        )
