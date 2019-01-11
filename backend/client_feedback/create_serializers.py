from rest_framework import serializers
from client_feedback.models import ClientFeedback


class ClientFeedbackCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClientFeedback
        fields = (
            'id',
            'feedback'
        )
