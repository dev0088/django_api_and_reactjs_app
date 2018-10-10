from django.shortcuts import render

# Create your views here.
from talent_skill.models import TalentSkill
from talent_skill.serializers import TalentSkillSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentSkillList(APIView):
  """
  List all talent position sub types.
  """
  def get(self, request, format=None):
    talent_skill = TalentSkill.objects.all()
    serializer = TalentSkillSerializer(talent_skill, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = TalentSkillSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TalentSkillDetail(APIView):
  """
  Retrieve a talent_skill_item instance.
  """
  def get_object(self, pk):
    try:
      return TalentSkill.objects.get(pk=pk)
    except TalentSkill.DoesNotExist:
      raise Http404

  def get(self, request, pk, format=None):
    talent_skill_item = self.get_object(pk)
    serializer = TalentSkillSerializer(talent_skill_item)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    talent_skill_item = self.get_object(pk)
    serializer = TalentSkillSerializer(talent_skill_item, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    talent_skill_item = self.get_object(pk)
    talent_skill_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
