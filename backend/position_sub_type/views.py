from django.shortcuts import render

# Create your views here.
from position_sub_type.models import PositionSubType
from position_sub_type.serializers import PositionSubTypeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PositionSubTypeList(APIView):
    """
    List all position sub types.
    """
    def get(self, request, format=None):
        position_sub_type = PositionSubType.objects.all()
        serializer = PositionSubTypeSerializer(position_sub_type, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PositionSubTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PositionSubTypeDetail(APIView):
    """
    Retrieve a position_sub_type_item instance.
    """
    def get_object(self, pk):
        try:
            return PositionSubType.objects.get(pk=pk)
        except PositionSubType.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        position_sub_type_item = self.get_object(pk)
        serializer = PositionSubTypeSerializer(position_sub_type_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        position_sub_type_item = self.get_object(pk)
        serializer = PositionSubTypeSerializer(position_sub_type_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        position_sub_type_item = self.get_object(pk)
        position_sub_type_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
