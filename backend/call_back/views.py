from authentication.models import User
from client.models import Client
from call_back.models import CallBack
from call_back.serializers import CallBackSerializer
from call_back.detail_serializers import CallBackDetailSerializer
from call_back.create_serializers import CallBackCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class CallBackList(APIView):
    """
    Retrieve all callbacks of client.
    """
    @swagger_auto_schema(responses={200: CallBackDetailSerializer(many=True)})
    def get(self, request, format=None):
        try:
            user = User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

        client = Client.objects.get(user=user)
        call_backs = CallBack.objects.filter(client_id=client.id)
        serializer = CallBackDetailSerializer(call_backs, many=True)
        return Response(serializer.data)


class CallBackDetail(APIView):
    """
    Retrieve, update or delete a blocked profile of client.
    """
    def get_object(self, pk):
        try:
            return CallBack.objects.get(pk=pk)
        except CallBack.DoesNotExist:
            raise Http404

    def get_user(self, request):
        try:
            return User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: CallBackDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        user = self.get_user(request)
        call_back = self.get_object(pk)
        serializer = CallBackDetailSerializer(call_back)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CallBackCreateSerializer(many=False),
                         responses={200: CallBackSerializer(many=False)})
    def put(self, request, pk, format=None):
        user = self.get_user(request)
        call_back = self.get_object(pk)
        serializer = CallBackCreateSerializer(call_back, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        user = self.get_user(request)
        call_back = self.get_object(pk)
        call_back.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class CallBackCreate(APIView):
    @swagger_auto_schema(
        request_body=CallBackCreateSerializer(many=False),
        responses={200: CallBackCreateSerializer(many=False)}
    )
    def post(self, request, format=None):
        user = request.user
        client = Client.objects.get(user_id=user.id)
        # Check exist.
        talent_id = request.data['talent']
        callback = CallBack.objects.filter(client_id=client, talent_id=talent_id).first();
        if callback:
            return Response(
                        {'error': {"talent": ["this talent already exists."]}},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        serializer = CallBackCreateSerializer(data=request.data, many=False)
        if serializer.is_valid():
            new_call_back = CallBack(client_id=client.id, **serializer.validated_data)
            new_call_back.save()
            new_serializer = CallBackCreateSerializer(new_call_back, many=False)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
