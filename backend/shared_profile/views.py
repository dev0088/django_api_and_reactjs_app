from authentication.models import User
from client.models import Client
from team.models import Team
from team_member.models import TeamMember
from shared_profile.models import SharedProfile
from shared_profile.serializers import SharedProfileSerializer
from shared_profile.detail_serializers import SharedProfileDetailSerializer
from shared_profile.create_serializers import SharedProfileCreateSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework_bulk import (ListBulkCreateUpdateDestroyAPIView)


class SharedProfileList(APIView):
    """
    Retrieve all casting requests of client.
    """
    @swagger_auto_schema(responses={200: SharedProfileSerializer(many=True)})
    def get(self, request, format=None):
        user = User.objects.get(pk=request.user.pk)
        client = Client.objects.get(user=user)
        team = Team.objects.get(client_id=client.id)
        team_member_ids = TeamMember.objects.filter(team_id=team.id)\
            .values_list('id', flat=True)\
            .order_by('id')
        shared_profiles = SharedProfile.objects.filter(team_member_id__in=team_member_ids)
        serializer = SharedProfileSerializer(shared_profiles, many=True)
        return Response(serializer.data)


class SharedProfileDetail(APIView):
    """
    Retrieve, update or delete a casting request of client.
    """
    def get_object(self, pk):
        try:
            return SharedProfile.objects.get(pk=pk)
        except SharedProfile.DoesNotExist:
            raise Http404

    @swagger_auto_schema(responses={200: SharedProfileDetailSerializer(many=False)})
    def get(self, request, pk, format=None):
        shared_profile = self.get_object(pk)
        serializer = SharedProfileDetailSerializer(shared_profile)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=SharedProfileCreateSerializer(many=True),
        responses={200: SharedProfileSerializer(many=False)}
    )
    def put(self, request, pk, format=None):
        shared_profile = self.get_object(pk)
        serializer = SharedProfileSerializer(shared_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={200: 'OK'})
    def delete(self, request, pk, format=None):
        shared_profile = self.get_object(pk)
        shared_profile.delete()
        return Response({'id': int(pk)}, status=status.HTTP_200_OK)

#
# class SharedProfileCreate(APIView):
#     """
#     Get current client info
#     """
#     # authentication_classes = (authentication.TokenAuthentication, )
#     # permission_classes = (permissions.IsAuthenticated,)
#
#     def get_object(self, user):
#         try:
#             user = User.objects.get(pk=user.pk)
#             client = Client.objects.get(user=user.id)
#             return client
#         except Client.DoesNotExist:
#             raise Http404
#
#     @swagger_auto_schema(
#         request_body=SharedProfileCreateSerializer,
#         responses={200: SharedProfileCreateSerializer(many=True)}
#     )
#     def post(self, request, format=None):
#         client = self.get_object(request.user)
#         serializer = SharedProfileCreateSerializer(data=request.data)
#         if serializer.is_valid():
#             data = serializer.validated_data
#             new_shared_profile = SharedProfile(**data)
#             new_shared_profile.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#         return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SharedProfileBulkCreate(ListBulkCreateUpdateDestroyAPIView):
    """
    Create Team member info
    """
    # authentication_classes = (authentication.TokenAuthentication, )
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = SharedProfile.objects.all()
    serializer_class = SharedProfileCreateSerializer

    def get_object(self, user):
      try:
        user = User.objects.get(pk=user.pk)
        client = Client.objects.get(user=user.id)
        return client
      except Client.DoesNotExist:
        raise Http404

    def allow_bulk_create(self, qs, filtered):
        # custom logic here

        # default checks if the qs was filtered
        # qs comes from self.get_queryset()
        # filtered comes from self.filter_queryset(qs)
        return qs is not filtered