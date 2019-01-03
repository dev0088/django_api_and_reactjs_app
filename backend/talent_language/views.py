from django.shortcuts import render

from talent_language.models import TalentLanguage
from talent_language.serializers import TalentLanguageSerializer
from talent.models import Talent
from authentication.models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentLanguageList(APIView):
    def get_object(self, pk):
        try:
            user = User.objects.get(pk=pk)
            talent = Talent.objects.get(user=user.id)
            return talent
        except Talent.DoesNotExist:
            raise Http404
    """
    List all languages of a user.
    """
    def get(self, request, pk, format=None):
        try:
            talent = self.get_object(pk)
            talent_languages = TalentLanguage.objects.filter(talent=talent.id)
            serializer = TalentLanguageSerializer(talent_languages, many=True)
            return Response(serializer.data)
        except Talent.DoesNotExist:
            raise Http404

    """
    Reset all languages of a user.
    """
    def post(self, request, pk, format=None):
        talent = self.get_object(pk)
        data = request.data['talent_languages']

        # Remove previouse total languages of talent 
        talent_languages = TalentLanguage.objects.filter(talent=talent.id)
        talent_languages.delete()

        # Save languages from client
        for language in data:
            talent_language = TalentLanguage.objects.create(
                    talent=talent,
                    language=language['language'],
                    fluency=language['fluency']
                )
            talent_language.save()

        return Response(status=status.HTTP_201_CREATED)
