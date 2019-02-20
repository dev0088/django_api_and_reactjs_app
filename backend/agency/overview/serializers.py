
from rest_framework import serializers


class AgencyOverviewSerializer(serializers.Serializer):
    new_profiles = serializers.IntegerField(required=False)
    edit_profiles = serializers.IntegerField(required=False)
    casting_requests = serializers.IntegerField(required=False)
    dance_combo_loackouts = serializers.IntegerField(required=False)
    medical_disclousure = serializers.IntegerField(required=False)