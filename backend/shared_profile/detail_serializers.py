from rest_framework import serializers
from shared_profile.models import SharedProfile
from team_member.detail_serializers import TeamMemberDetailSerializer
from talent.simple_serializers import TalentSimpleSerializer


class SharedProfileDetailSerializer(serializers.ModelSerializer):
    team_member = TeamMemberDetailSerializer(many=False, read_only=True)
    talent = TalentSimpleSerializer(many=False, read_only=True)
    class Meta:
        model = SharedProfile
        fields = (
            'id',
            'team_member',
            'talent',
            'comment',
            'created'
        )

    def create(self, validated_data):
        return SharedProfile.objects.create(**validated_data)

