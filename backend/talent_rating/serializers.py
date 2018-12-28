from rest_framework import serializers
from .models import TalentRating


class TalentRatingSerializer(serializers.ModelSerializer):
  # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

    class Meta:
        model = TalentRating
        fields = (
            'id',
            'talent',
            'rating',
            'comments',
            'client',
            'updated'
        )