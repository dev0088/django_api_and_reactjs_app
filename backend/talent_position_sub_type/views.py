from django.shortcuts import render

# Create your views here.
from talent_position_sub_type.models import TalentPositionSubType
from talent_position_sub_type.serializers import TalentPositionSubTypeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentPositionSubTypeList(APIView):
    """
    List all talent position sub types.
    """
    def get(self, request, format=None):
        talent_position_sub_type = TalentPositionSubType.objects.all()
        serializer = TalentPositionSubTypeSerializer(talent_position_sub_type, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TalentPositionSubTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TalentPositionSubTypeDetail(APIView):
    """
    Retrieve a talent_position_sub_type_item instance.
    """
    def get_object(self, pk):
        try:
            return TalentPositionSubType.objects.get(pk=pk)
        except TalentPositionSubType.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        talent_position_sub_type_item = self.get_object(pk)
        serializer = TalentPositionSubTypeSerializer(talent_position_sub_type_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        talent_position_sub_type_item = self.get_object(pk)
        serializer = TalentPositionSubTypeSerializer(talent_position_sub_type_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_position_sub_type_item = self.get_object(pk)
        talent_position_sub_type_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
