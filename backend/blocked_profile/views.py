from authentication.models import User
from client.models import Client
from blocked_profile.models import BlockedProfile
from blocked_profile.serializers import BlockedProfileSerializer
from blocked_profile.detail_serializers import BlockedProfileDetailSerializer
from blocked_profile.create_serializers import BlockedProfileCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema


class BlockedProfileList(APIView):
    """
    Retrieve all blocked profiles of client.
    """
    @swagger_auto_schema(responses={200: BlockedProfileDetailSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        blocked_profiles = BlockedProfile.objects.filter(client=client)
        serializer = BlockedProfileDetailSerializer(blocked_profiles, many=True)
        return Response(serializer.data)


class BlockedProfileDetail(APIView):
    """
    Retrieve, update or delete a blocked profile of client.
    """
    def get_object(self, pk):
        try:
            return BlockedProfile.objects.get(pk=pk)
        except BlockedProfile.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: BlockedProfileDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        blocked_profile = self.get_object(pk)
        serializer = BlockedProfileDetailSerializer(blocked_profile)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=BlockedProfileCreateSerializer(many=False),
                         responses={200: BlockedProfileSerializer(many=False)})
    def put(self, request, pk, format=None):
        blocked_profile = self.get_object(pk)
        serializer = BlockedProfileCreateSerializer(blocked_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        blocked_profile = self.get_object(pk)
        blocked_profile.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)


class BlockedProfileCreate(APIView):
    @swagger_auto_schema(
        request_body=BlockedProfileCreateSerializer(many=False),
        responses={200: BlockedProfileDetailSerializer(many=False)}
    )
    def post(self, request, format=None):
        user = request.user
        client = Client.objects.get(user_id=user.id)
        serializer = BlockedProfileCreateSerializer(data=request.data, many=False)
        if serializer.is_valid():
            new_blocked_profile = BlockedProfile(client_id=client.id, **serializer.validated_data)
            new_blocked_profile.save()
            new_serializer = BlockedProfileDetailSerializer(new_blocked_profile, many=False)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
