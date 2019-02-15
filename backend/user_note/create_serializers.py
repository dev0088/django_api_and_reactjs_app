from rest_framework import serializers
from user_note.models import UserNote


class UserNoteCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserNote
        fields = (
          'receiver',
          'note_type',
          'note'
        )

    def create(self, validated_data):
        return UserNote.objects.create(**validated_data)

