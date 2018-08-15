from rest_framework import serializers
from talent_video.models import TalentVideo

class TalentVideoSerializer(serializers.ModelSerializer):
  # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

  class Meta:
    model = TalentVideo
    fields = (
      'id', 
      'talent', 
      'name', 
      'path', 
      'url',
      'size', 
      'file_type', 
      'timestamp', 
      'position_type',
      'position_sub_type',
      'question',
      'updated', 
      'uploaded', 
      'active'
    )