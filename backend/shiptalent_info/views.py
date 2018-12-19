from django.shortcuts import render

# Create your views here.
from shiptalent_info.models import ShipTalentInfo
from shiptalent_info.serializers import ShipTalentInfoSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ShipTalentInfoList(APIView):
    """
    List all shiptalent_info.
    """
    def get(self, request, format=None):
        shiptalent_info = ShipTalentInfo.objects.all()
        serializer = ShipTalentInfoSerializer(shiptalent_info, many=True)
        return Response(serializer.data)

    # def post(self, request, format=None):
    #     serializer = ShipTalentInfoSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ShipTalentInfoDetail(APIView):
    """
    Retrieve a shiptalent_info_item instance.
    """
    def get_object(self, pk):
        try:
            return ShipTalentInfo.objects.get(pk=pk)
        except ShipTalentInfo.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        shiptalent_info_item = self.get_object(pk)
        serializer = ShipTalentInfoSerializer(shiptalent_info_item)
        return Response(serializer.data)

    # def put(self, request, pk, format=None):
    #     shiptalent_info_item = self.get_object(pk)
    #     serializer = ShipTalentInfoSerializer(shiptalent_info_item, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
  #
    # def delete(self, request, pk, format=None):
    #     shiptalent_info_item = self.get_object(pk)
    #     shiptalent_info_item.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
