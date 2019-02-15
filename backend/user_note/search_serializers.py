from rest_framework import serializers


class UserNoteSearchSerializer(serializers.Serializer):
    creator = serializers.CharField(required=False)
    receiver = serializers.IntegerField(required=False)
    actor = serializers.IntegerField(required=False)
    note_types = serializers.ListField(child=serializers.CharField(), required=False)
    note = serializers.CharField(required=False)
    count = serializers.IntegerField(required=False)
    current_page = serializers.IntegerField(required=False)