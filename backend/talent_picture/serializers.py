from rest_framework import serializers
from .models import TalentPicture

class TalentPictureSerializer(serializers.ModelSerializer):
    # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

    class Meta:
        model = TalentPicture
        fields = (
            'id',
            'talent',
            'name',
            'priority',
            'path',
            'url',
            'size',
            'file_type',
            'timestamp',
            'updated',
            'uploaded',
            'active',
            'caption'
        )
