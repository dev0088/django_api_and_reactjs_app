from rest_framework import serializers
from shiptalent_info.models import ShipTalentInfo

class ShipTalentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipTalentInfo
        fields = ('id', 'name', 'value', 'description')
