from django.shortcuts import render

# Create your views here.
from talent_additional_position_sub_type.models import TalentAdditionalPositionSubType
from talent_additional_position_sub_type.serializers import TalentAdditionalPositionSubTypeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TalentAdditionalPositionSubTypeList(APIView):
    """
    List all talent position sub types.
    """
    def get(self, request, format=None):
        talent_additional_position_sub_type = TalentAdditionalPositionSubType.objects.all()
        serializer = TalentAdditionalPositionSubTypeSerializer(talent_additional_position_sub_type, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TalentAdditionalPositionSubTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TalentAdditionalPositionSubTypeDetail(APIView):
    """
    Retrieve a talent_additional_position_sub_type_item instance.
    """
    def get_object(self, pk):
        try:
            return TalentAdditionalPositionSubType.objects.get(pk=pk)
        except TalentAdditionalPositionSubType.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        talent_additional_position_sub_type_item = self.get_object(pk)
        serializer = TalentAdditionalPositionSubTypeSerializer(talent_additional_position_sub_type_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        talent_additional_position_sub_type_item = self.get_object(pk)
        serializer = TalentAdditionalPositionSubTypeSerializer(talent_additional_position_sub_type_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        talent_additional_position_sub_type_item = self.get_object(pk)
        talent_additional_position_sub_type_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
