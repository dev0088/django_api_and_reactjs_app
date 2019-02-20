from authentication.models import User
from casting_request_talent.models import CastingRequestTalent
from casting_request_talent.details_by_talent_serializers import CastingRequestTalentDetailByTalentSerializer
from agency.casting_request_talent_serializers import CastingRequestTalentSearchSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class CastingRequestTalentSearch(APIView):
    """
    Retrieve all casting requests of talent.
    """
    @swagger_auto_schema(request_body=CastingRequestTalentSearchSerializer, responses={200: CastingRequestTalentDetailByTalentSerializer(many=True)})
    def post(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        casting_request_talents = CastingRequestTalent.objects.filter(talent=request.data['talent_id'])
        serializer = CastingRequestTalentDetailByTalentSerializer(casting_request_talents, many=True)
        return Response(serializer.data)

