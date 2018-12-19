from django.shortcuts import render
from skill.models import Skill
from skill.serializers import SkillSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SkillList(APIView):
    """
    List all skill.
    """
    def get(self, request, format=None):
        skill = Skill.objects.all()
        serializer = SkillSerializer(skill, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class SkillDetail(APIView):
    """
    Retrieve a skill_item instance.
    """
    def get_object(self, pk):
        try:
            return Skill.objects.get(pk=pk)
        except Skill.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        skill_item = self.get_object(pk)
        serializer = SkillSerializer(skill_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        skill_item = self.get_object(pk)
        serializer = SkillSerializer(skill_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        skill_item = self.get_object(pk)
        skill_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
