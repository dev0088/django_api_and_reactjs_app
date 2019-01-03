from rest_framework import serializers
from team_member.models import TeamMember


class TeamMemberCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeamMember
        fields = (
            'id',
            'team',
            'member_email',
            'created'
        )

    def create(self, validated_data):
        return TeamMember.objects.create(**validated_data)
