from rest_framework import serializers
from shared_profile.models import SharedProfile
from rest_framework_bulk import (
    BulkListSerializer,
    BulkSerializerMixin
)


class SharedProfileCreateSerializer(BulkSerializerMixin, serializers.ModelSerializer):

    class Meta:
        model = SharedProfile
        fields = (
            'id',
            'team_member',
            'talent',
            'comment'
        )
        list_serializer_class = BulkListSerializer

    def create(self, validated_data):
        return SharedProfile.objects.create(**validated_data)
