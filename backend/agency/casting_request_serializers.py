from rest_framework import serializers
from drf_yasg.utils import swagger_serializer_method


class CastingRequestSetStatusSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=20, required=True)
    status_updated_date = serializers.DateTimeField(required=True)


class CastingRequestSearchSerializer(serializers.Serializer):
    status = serializers.ListField(serializers.CharField(required=False), required=False)
