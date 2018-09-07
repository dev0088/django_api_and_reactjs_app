from rest_framework import serializers
from .models import TalentVisa

class TalentVisaSerializer(serializers.ModelSerializer):

  class Meta:
    model = TalentVisa
    fields = (
    	'talent',
    	'name',
    	'expiration_date'
    )
