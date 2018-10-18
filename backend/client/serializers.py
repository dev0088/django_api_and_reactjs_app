from rest_framework import serializers
from client.models import *


class TalentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talent
        fields = (
        'talent_id', 'name', 'sex', 'type', 'role', 'role_description', 'able_in', 'able_out', 'age', 'height', 'lang',
        'avg_rating', 'comment')
