from authentication.models import User
from casting_request.models import CastingRequest
from talent.models import Talent
from agency.sort_talent.serializers import AgencySortTalentAlphaSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class AgencyShortTalentAlpha(APIView):
    """
    Retrieve overview info
    """
    @swagger_auto_schema(responses={200: AgencySortTalentAlphaSerializer(many=False)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        talents = Talent.objects.all().order_by('user__last_name', 'user__first_name')
        data = []
        for talent in talents:
          item = {
            'id': talent.id,
            'user': talent.user
          }
        id = serializers.IntegerField(required=True)
        user = GeneralUserSerializer(many=False, read_only=True)
        picture = serializers.StringField(required=False)
        tid = serializers.StringField(required=False)
        tid = serializers.StringField(required=False)
        approved_date = serializers.DateTimeField(required=False)
        average_rating = serializers.FloatField(required=False)
        created = serializers.DateTimeField(required=False)
        
        return Response()

def check_sort_condition(self, talents, search_conditions):
        if ('alpha' in search_conditions) and search_conditions['alpha']:
            talents = talents.order_by('user__first_name', 'user__last_name')

        if ('blocks' in search_conditions) and search_conditions['blocks']:
            talents = talents.order_by('talent_blocked_profiles__blocked_time')

        if ('casting_request' in search_conditions) and search_conditions['casting_request']:
            talents = talents.order_by('talent_blocked_profiles__blocked_time')

        return talents