from django.shortcuts import render

from talent_medical.models import TalentMedical
from talent_medical.serializers import TalentMedicalSerializer
from talent.models import Talent
from authentication.models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentMedicalList(APIView):
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
            talent_medicals = TalentMedical.objects.filter(talent=talent.id)
            serializer = TalentMedicalSerializer(talent_medicals, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404

    """
    Reset all medicals of a user.
    """
    def post(self, request, pk, format=None):
        talent = self.get_object(pk)
        data = request.data['talent_medicals']

        # Remove previouse total condition_titles of talent
        talent_medicals = TalentMedical.objects.filter(talent=talent.id)
        talent_medicals.delete()

        # Save condition_titles from client
        for condition_title in data:
            talent_medical = TalentMedical.objects.create(
                    talent = talent,
                    condition_title = condition_title['condition_title'],
                    condition_value = condition_title['condition_value']
                )
            talent_medical.save()

        return Response(status=status.HTTP_201_CREATED)
