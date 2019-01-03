from rest_framework import serializers
from team_member.models import TeamMember
from team.serializers import TeamSerializer


class TeamMemberDetailSerializer(serializers.ModelSerializer):
    team = TeamSerializer(many=False, read_only=True)

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

