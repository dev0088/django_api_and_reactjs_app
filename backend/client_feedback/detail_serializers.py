from rest_framework import serializers
from client_feedback.models import ClientFeedback
from client.general_serializers import ClientSerializer


class ClientFeedbackDetailSerializer(serializers.ModelSerializer):
    client = ClientSerializer(many=False, read_only=True)

    class Meta:
        model = ClientFeedback
        fields = (
            'id',
            'client',
            'feedback',
            'created'
        )
