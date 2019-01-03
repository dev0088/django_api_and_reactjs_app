from rest_framework import serializers
from client.general_serializers import ClientSerializer
from team.models import Team


class TeamSerializer(serializers.ModelSerializer):
    client = ClientSerializer(many=False, read_only=True)

    class Meta:
        model = Team
        fields = (
            'id',
            'client',
            'name',
            'created'
        )


