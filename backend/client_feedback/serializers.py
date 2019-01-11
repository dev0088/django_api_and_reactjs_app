from rest_framework import serializers
from client_feedback.models import ClientFeedback


class ClientFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClientFeedback
        fields = (
            'id',
            'client',
            'feedback',
            'created'
        )
