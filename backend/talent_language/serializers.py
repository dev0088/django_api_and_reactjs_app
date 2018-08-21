from rest_framework import serializers
from .models import TalentLanguage

class TalentLanguageSerializer(serializers.ModelSerializer):
  # talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

  class Meta:
    model = TalentLanguage
    fields = (
    	'talent', 
    	'language', 
    	'fluency'
    )