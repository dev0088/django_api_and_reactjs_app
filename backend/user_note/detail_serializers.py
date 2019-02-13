from rest_framework import serializers
from user_note.models import UserNote
from authentication.serializers import GeneralUserSerializer


class UserNoteDetailSerializer(serializers.ModelSerializer):

  actor = GeneralUserSerializer(many=False)
  receiver = GeneralUserSerializer(many=False)

  class Meta:
    model = UserNote
    fields = (
      'id',
      'creator',
      'actor',
      'receiver',
      'note_type',
      'note',
      'created'
    )


