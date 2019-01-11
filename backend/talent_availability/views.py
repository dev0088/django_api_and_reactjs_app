from django.shortcuts import render

from talent_availability.models import TalentAvailability
from talent_availability.serializers import TalentAvailabilitySerializer
from talent.models import Talent
from authentication.models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dateutil.parser import parse

class TalentAvailabilityList(APIView):
    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            return talent
        except Talent.DoesNotExist:
            raise Http404
    """
    List all condition_titles of a user.
    """
    def get(self, request, pk, format=None):
        try:
            talent = self.get_object(pk)
            talent_availabilities = TalentAvailability.objects.filter(talent=talent.id)
            serializer = TalentAvailabilitySerializer(talent_availabilities, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404

    """
    Reset all availabilities of a user.
    """
    def post(self, request, pk, format=None):
        talent = self.get_object(pk)
        data = request.data['talent_availabilities']

        # Remove previouse total condition_titles of talent
        talent_availabilities = TalentAvailability.objects.filter(talent=talent.id)
        talent_availabilities.delete()
        # Save condition_titles from client
        for availability in data:
            talent_availability = TalentAvailability.objects.create(
                    talent = talent,
                    start_date=parse(availability['start_date']),
                    end_date=parse(availability['end_date'])
                )
            talent_availability.save()

        return Response(status=status.HTTP_201_CREATED)
