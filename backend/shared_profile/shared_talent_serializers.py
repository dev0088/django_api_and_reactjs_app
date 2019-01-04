from rest_framework import serializers
from team_member.serializers import TeamMemberSerializer
from talent.simple_serializers import TalentSimpleSerializer


class SharedTalentSerializer(serializers.Serializer):
    talent = TalentSimpleSerializer(many=False)
    team_members = TeamMemberSerializer(many=True)

