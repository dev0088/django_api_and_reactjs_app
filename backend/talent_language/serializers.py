from rest_framework import serializers
from .models import TalentLanguage

class TalentLanguageSerializer(serializers.ModelSerializer):

  class Meta:
    model = TalentLanguage
    fields = (
    	'talent',
    	'language',
    	'fluency'
    )
