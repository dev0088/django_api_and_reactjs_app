from rest_framework import serializers
from team_member.models import TeamMember
from rest_framework_bulk import (
    BulkListSerializer,
    BulkSerializerMixin
)


class TeamMemberCreateSerializer(BulkSerializerMixin, serializers.ModelSerializer):

    class Meta:
        model = TeamMember
        fields = (
            'id',
            'team',
            'member_email',
            'created'
        )
        list_serializer_class = BulkListSerializer

    def create(self, validated_data):
        return TeamMember.objects.create(**validated_data)
