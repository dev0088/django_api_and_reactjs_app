from authentication.models import User
from client.models import Client
from favorite.models import Favorite
from favorite.serializers import FavoriteSerializer
from favorite.detail_serializers import FavoriteDetailSerializer
from favorite.create_serializers import FavoriteCreateSerializer
from datetime import datetime
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class FavoriteList(APIView):
    """
    Retrieve all favorites of client.
    """
    @swagger_auto_schema(responses={200: FavoriteDetailSerializer(many=True)})
    def get(self, request, format=None):
        try:
            user = User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

        client = Client.objects.get(user=user)
        favorites = Favorite.objects.filter(client_id=client.id).order_by('-viewed_time')
        serializer = FavoriteDetailSerializer(favorites, many=True)
        return Response(serializer.data)


class FavoriteDetail(APIView):
    """
    Retrieve, update or delete a blocked profile of client.
    """
    def get_object(self, pk):
        try:
            return Favorite.objects.get(pk=pk)
        except Favorite.DoesNotExist:
            raise Http404

    def get_user(self, request):
        try:
            return User.objects.get(pk=request.user.pk)
        except User.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: FavoriteDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        user = self.get_user(request)
        favorite = self.get_object(pk)
        serializer = FavoriteDetailSerializer(favorite)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=FavoriteCreateSerializer(many=False),
                         responses={200: FavoriteSerializer(many=False)})
    def put(self, request, pk, format=None):
        user = self.get_user(request)
        favorite = self.get_object(pk)
        serializer = FavoriteCreateSerializer(favorite, data=request.data)
        if serializer.is_valid():
            serializer.data.viewed_time = datetime.now
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        user = self.get_user(request)
        favorite = self.get_object(pk)
        favorite.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class FavoriteCreate(APIView):
    @swagger_auto_schema(
        request_body=FavoriteCreateSerializer(many=False),
        responses={200: FavoriteCreateSerializer(many=False)}
    )
    def post(self, request, format=None):
        user = request.user
        client = Client.objects.get(user_id=user.id)
        # Check exist.
        talent_id = request.data['talent']
        favorite = Favorite.objects.filter(client_id=client, talent_id=talent_id).first();
        if favorite:
            return Response(
                        {'error': {"talent": ["this talent already exists."]}},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        serializer = FavoriteCreateSerializer(data=request.data, many=False)
        if serializer.is_valid():
            new_favorite = Favorite(client_id=client.id, **serializer.validated_data)
            new_favorite.save()
            new_serializer = FavoriteCreateSerializer(new_favorite, many=False)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
