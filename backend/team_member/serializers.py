from rest_framework import serializers
from team_member.models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeamMember
        fields = (
            'id',
            'team',
            'member_email',
            'created'
        )


