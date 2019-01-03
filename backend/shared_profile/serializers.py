from rest_framework import serializers
from shared_profile.models import SharedProfile


class SharedProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = SharedProfile
        fields = (
            'id',
            'team_member',
            'talent',
            'comment',
            'created'
        )


