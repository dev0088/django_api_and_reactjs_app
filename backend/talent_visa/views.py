from django.shortcuts import render

from talent_visa.models import TalentVisa
from talent_visa.serializers import TalentVisaSerializer
from talent.models import Talent
from authentication.models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentVisaList(APIView):
    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            return talent
        except Talent.DoesNotExist:
            raise Http404
    """
    List all visas of a user.
    """
    def get(self, request, pk, format=None):
        try:
            talent = self.get_object(pk)
            talent_visas = TalentVisa.objects.filter(talent=talent.id)
            serializer = TalentVisaSerializer(talent_visas, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404

    """
    Reset all visa of a user.
    """
    def post(self, request, pk, format=None):
        talent = self.get_object(pk)
        data = request.data['talent_visas']

        # Remove previouse total visas of talent
        talent_visas = TalentVisa.objects.filter(talent=talent.id)
        talent_visas.delete()

        # Save visas from client
        for visa in data:
            talent_visa = TalentVisa.objects.create(
                    talent = talent,
                    name = visa['name'],
                    expiration_date = visa['expiration_date']
                )
            talent_visa.save()

        return Response(status=status.HTTP_201_CREATED)
