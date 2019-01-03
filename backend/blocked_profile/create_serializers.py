from rest_framework import serializers
from blocked_profile.models import BlockedProfile


class BlockedProfileCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockedProfile
        fields = (
            'id',
            'talent',
            'description'
        )
