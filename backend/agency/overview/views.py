from authentication.models import User
from casting_request.models import CastingRequest
from talent.models import Talent
from agency.overview.serializers import AgencyOverviewSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class AgencyOverview(APIView):
    """
    Retrieve overview info
    """
    @swagger_auto_schema(responses={200: AgencyOverviewSerializer(many=False)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        new_profiles = Talent.objects.filter(approved=False).count()
        edit_profiles = Talent.objects.filter(approved=True).count()
        casting_requests = CastingRequest.objects.filter(status__in=['Requested', 'Reviewing']).count()
        dance_combo_lockouts = Talent.objects.filter(locked_dance_combination=True).count()
        medical_disclousures = 0
        data = {
          "new_profiles": new_profiles,
          "edit_profiles": edit_profiles,
          "casting_requests": casting_requests,
          "dance_combo_lockouts": dance_combo_lockouts,
          "medical_disclousures": medical_disclousures
        }
        # serializer = AgencyOverviewSerializer(data, many=False)
        return Response(data)

