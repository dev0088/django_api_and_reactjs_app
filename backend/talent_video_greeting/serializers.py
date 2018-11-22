from rest_framework import serializers
from talent_video_greeting.models import TalentVideoGreeting


class TalentVideoGreetingSerializer(serializers.ModelSerializer):
    # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

    class Meta:
        model = TalentVideoGreeting
        fields = (
            'id',
            'talent',
            'name',
            'path',
            'url',
            'size',
            'file_type',
            'timestamp',
            'updated',
            'uploaded',
            'active',
            'language',
            'priority'
        )
