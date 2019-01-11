from authentication.models import User
from client.models import Client
from client_request.models import ClientRequest
from client_request.serializers import ClientRequestSerializer
from client_request.detail_serializers import ClientRequestDetailSerializer
from client_request.create_serializers import ClientRequestCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class ClientRequestList(APIView):
    """
    Retrieve all feedbacks of client.
    """
    @swagger_auto_schema(responses={200: ClientRequestDetailSerializer(many=True)})
    def get(self, request, format=None):
        try:
            user = User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

        client = Client.objects.get(user=user)
        client_requests = ClientRequest.objects.filter(client_id=client.id)
        serializer = ClientRequestDetailSerializer(client_requests, many=True)
        return Response(serializer.data)


class ClientRequestDetail(APIView):
    """
    Retrieve, update or delete a request for a talent from client.
    """
    def get_object(self, pk):
        try:
            return ClientRequest.objects.get(pk=pk)
        except ClientRequest.DoesNotExist:
            raise Http404

    def get_user(self, request):
        try:
            return User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: ClientRequestDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        user = self.get_user(request)
        client_request = self.get_object(pk)
        serializer = ClientRequestDetailSerializer(client_request)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=ClientRequestSerializer(many=False),
                         responses={200: ClientRequestSerializer(many=False)})
    def put(self, request, pk, format=None):
        user = self.get_user(request)
        client_request = self.get_object(pk)
        serializer = ClientRequestSerializer(client_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        user = self.get_user(request)
        client_request = self.get_object(pk)
        client_request.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class ClientRequestCreate(APIView):
    @swagger_auto_schema(
        request_body=ClientRequestCreateSerializer(many=False),
        responses={200: ClientRequestSerializer(many=False)}
    )
    def post(self, request, format=None):
        user = request.user
        client = Client.objects.get(user_id=user.id)

        serializer = ClientRequestCreateSerializer(data=request.data, many=False)
        if serializer.is_valid():
            new_client_request = ClientRequest(client_id=client.id, **serializer.validated_data)
            new_client_request.save()
            new_serializer = ClientRequestSerializer(new_client_request, many=False)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
