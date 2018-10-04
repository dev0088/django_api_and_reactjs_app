from django.shortcuts import render

# Create your views here.
from sub_skill.models import SubSkill
from sub_skill.serializers import SubSkillSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SubSkillList(APIView):
    """
    List all position sub types.
    """
    def get(self, request, format=None):
        sub_skill = SubSkill.objects.all()
        serializer = SubSkillSerializer(sub_skill, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SubSkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubSkillDetail(APIView):
    """
    Retrieve a sub_skill_item instance.
    """
    def get_object(self, pk):
        try:
            return SubSkill.objects.get(pk=pk)
        except SubSkill.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        sub_skill_item = self.get_object(pk)
        serializer = SubSkillSerializer(sub_skill_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        sub_skill_item = self.get_object(pk)
        serializer = SubSkillSerializer(sub_skill_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        sub_skill_item = self.get_object(pk)
        sub_skill_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
