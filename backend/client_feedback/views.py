from authentication.models import User
from client.models import Client
from client_feedback.models import ClientFeedback
from client_feedback.serializers import ClientFeedbackSerializer
from client_feedback.detail_serializers import ClientFeedbackDetailSerializer
from client_feedback.create_serializers import ClientFeedbackCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class ClientFeedbackList(APIView):
    """
    Retrieve all feedbacks of client.
    """
    @swagger_auto_schema(responses={200: ClientFeedbackDetailSerializer(many=True)})
    def get(self, request, format=None):
        try:
            user = User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

        client = Client.objects.get(user=user)
        client_feedbacks = ClientFeedback.objects.filter(client_id=client.id)
        serializer = ClientFeedbackDetailSerializer(client_feedbacks, many=True)
        return Response(serializer.data)


class ClientFeedbackDetail(APIView):
    """
    Retrieve, update or delete a blocked profile of client.
    """
    def get_object(self, pk):
        try:
            return ClientFeedback.objects.get(pk=pk)
        except ClientFeedback.DoesNotExist:
            raise Http404

    def get_user(self, request):
        try:
            return User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: ClientFeedbackDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        user = self.get_user(request)
        client_feedback = self.get_object(pk)
        serializer = ClientFeedbackDetailSerializer(client_feedback)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=ClientFeedbackSerializer(many=False),
                         responses={200: ClientFeedbackSerializer(many=False)})
    def put(self, request, pk, format=None):
        user = self.get_user(request)
        client_feedback = self.get_object(pk)
        serializer = ClientFeedbackSerializer(client_feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        user = self.get_user(request)
        client_feedback = self.get_object(pk)
        client_feedback.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class ClientFeedbackCreate(APIView):
    @swagger_auto_schema(
        request_body=ClientFeedbackCreateSerializer(many=False),
        responses={200: ClientFeedbackSerializer(many=False)}
    )
    def post(self, request, format=None):
        user = request.user
        client = Client.objects.get(user_id=user.id)

        serializer = ClientFeedbackCreateSerializer(data=request.data, many=False)
        if serializer.is_valid():
            new_client_feedback = ClientFeedback(client_id=client.id, **serializer.validated_data)
            new_client_feedback.save()
            new_serializer = ClientFeedbackSerializer(new_client_feedback, many=False)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
