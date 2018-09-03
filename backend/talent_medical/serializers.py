from rest_framework import serializers
from .models import TalentMedical

class TalentMedicalSerializer(serializers.ModelSerializer):
  talent = serializers.SlugRelatedField(many=False, read_only=True, slug_field='id')

  class Meta:
    model = TalentMedical
    fields = (
    	'talent',
    	'condition_title',
    	'condition_value'
    )
