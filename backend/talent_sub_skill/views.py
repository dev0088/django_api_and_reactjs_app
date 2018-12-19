from django.shortcuts import render

# Create your views here.
from talent_sub_skill.models import TalentSubSkill
from talent_sub_skill.serializers import TalentSubSkillSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentSubSkillList(APIView):
  """
  List all talent position sub types.
  """
  def get(self, request, format=None):
    talent_sub_skill = TalentSubSkill.objects.all()
    serializer = TalentSubSkillSerializer(talent_sub_skill, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = TalentSubSkillSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class TalentSubSkillDetail(APIView):
  """
  Retrieve a talent_sub_skill_item instance.
  """
  def get_object(self, pk):
    try:
      return TalentSubSkill.objects.get(pk=pk)
    except TalentSubSkill.DoesNotExist:
      raise Http404

  def get(self, request, pk, format=None):
    talent_sub_skill_item = self.get_object(pk)
    serializer = TalentSubSkillSerializer(talent_sub_skill_item)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    talent_sub_skill_item = self.get_object(pk)
    serializer = TalentSubSkillSerializer(talent_sub_skill_item, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    talent_sub_skill_item = self.get_object(pk)
    talent_sub_skill_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
