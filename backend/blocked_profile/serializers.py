from rest_framework import serializers
from blocked_profile.models import BlockedProfile


class BlockedProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockedProfile
        fields = (
            'id',
            'client',
            'talent',
            'blocked_time',
            'description'
        )
