from rest_framework import serializers
from team_member.serializers import TeamMemberSerializer
from talent.simple_serializers import TalentSimpleSerializer


class SharedTalentByTeamMemberSerializer(serializers.Serializer):
    team_member = TeamMemberSerializer(many=False)
    talents = TalentSimpleSerializer(many=True)

