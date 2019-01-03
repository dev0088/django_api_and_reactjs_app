from rest_framework import serializers
from team.models import Team
from client.serializers import ClientSerializer
from team.serializers import TeamSerializer


class TeamDetailSerializer(serializers.ModelSerializer):
    client = ClientSerializer(many=False, read_only=True)

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

