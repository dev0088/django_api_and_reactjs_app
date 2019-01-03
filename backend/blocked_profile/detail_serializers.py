from rest_framework import serializers
from blocked_profile.models import BlockedProfile
from talent.simple_serializers import TalentSimpleSerializer


class BlockedProfileDetailSerializer(serializers.ModelSerializer):
    talent = TalentSimpleSerializer(many=False, read_only=True)

    class Meta:
        model = BlockedProfile
        fields = (
            'id',
            'client',
            'talent',
            'blocked_time',
            'description'
        )
