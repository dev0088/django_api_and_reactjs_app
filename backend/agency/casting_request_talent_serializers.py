from rest_framework import serializers


class CastingRequestTalentSearchSerializer(serializers.Serializer):
    talent_id = serializers.IntegerField(required=False)