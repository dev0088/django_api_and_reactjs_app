from django.shortcuts import render

# Create your views here.
from client_casting_request.models import ClientCastingRequest
from client_casting_request.serializers import ClientCastingRequestSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ClientCastingRequestList(APIView):
    """
    Retrieve all casting requests of client.
    """
    def get(self, request, format=None):
        client_casting_request = ClientCastingRequest.objects.all()
        serializer = ClientCastingRequestSerializer(client_casting_request, many=True)
        return Response(serializer.data)

class ClientCastingRequestDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return ClientCastingRequest.objects.get(pk=pk)
        except ClientCastingRequest.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        client_casting_request = self.get_object(pk)
        serializer = ClientCastingRequestSerializer(client_casting_request)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        client_casting_request = self.get_object(pk)
        serializer = ClientCastingRequestSerializer(client_casting_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        client_casting_request = self.get_object(pk)
        client_casting_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
