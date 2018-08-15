from rest_framework import serializers

from .models import User
from talent.models import Talent
# from talent.serializers import TalentSerializer

# class TalentUserSerializer(serializers.ModelSerializer):
#     """Serializers registration requests and creates a new user."""
#     # talent = TalentSerializer(many=False, read_only=False)
#     class Meta:
#         model = User
#         fields = ['email', 'username', 'first_name', 'last_name', 'type']


class GeneralUserSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'type']

class RegistrationSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    token = serializers.CharField(max_length=255, read_only=True)

  # Talent profile
    # talent = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ['email', 'username', 'password', 'token', 'first_name', 'last_name', 'type']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        user = User.objects.create_user(**validated_data)
        # Create talent
        talent = Talent.objects.create(user_id=user.id)
        return user
