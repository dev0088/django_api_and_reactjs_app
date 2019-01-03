from rest_framework import serializers
from team.models import Team


class TeamCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = (
            'id',
            'client',
            'name',
            'created'
        )

    def create(self, validated_data):
        return Team.objects.create(**validated_data)

