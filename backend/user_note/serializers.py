from rest_framework import serializers
from user_note.models import UserNote


class UserNoteSerializer(serializers.ModelSerializer):

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


