from django.shortcuts import render
from position_type.models import PositionType
from position_type.serializers import PositionTypeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class PositionTypeList(APIView):
    """
    List all position_type.
    """
    def get(self, request, format=None):
        position_type = PositionType.objects.all()
        serializer = PositionTypeSerializer(position_type, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PositionTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PositionTypeDetail(APIView):
    """
    Retrieve a position_type_item instance.
    """
    def get_object(self, pk):
        try:
            return PositionType.objects.get(pk=pk)
        except PositionType.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        position_type_item = self.get_object(pk)
        serializer = PositionTypeSerializer(position_type_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        position_type_item = self.get_object(pk)
        serializer = PositionTypeSerializer(position_type_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        position_type_item = self.get_object(pk)
        position_type_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
